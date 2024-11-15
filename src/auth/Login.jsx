import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegistrationMutation,
  useFindByEmailUserQuery,
} from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { verifyToken } from "../utils/verifyToken";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.init";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForgetPasswordMutation } from "./loginApi";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [registration] = useRegistrationMutation();
  const { data: userExists, refetch: refetchUser } = useFindByEmailUserQuery(
    firebaseUser?.email,
    {
      skip: !firebaseUser?.email,
    }
  );
  const [forgetPassword, { isLoading, isError, error, isSuccess }] =
    useForgetPasswordMutation();
  useEffect(() => {
    const handleFirebaseLogin = async () => {
      if (!firebaseUser) return;

      const toastId = toast.loading("Checking user existence...");
      try {
        const userCheck = await refetchUser();

        if (userCheck.data) {
          // console.log("User exists:", userCheck.data);
          const userInfo = {
            email: firebaseUser.email,
            password: "normalUser12345",
          };
          const res = await login(userInfo).unwrap();
          const user = verifyToken(res.data.accessToken);
          dispatch(setUser({ user, token: res.data.accessToken }));
          toast.success("Logged in", { id: toastId, duration: 2000 });
          navigate("/dashboard");
        } else {
          // console.log("User does not exist, registering new user");
          const displayName = firebaseUser.displayName
            ? firebaseUser.displayName.split(" ")
            : ["", ""];
          const normalUser = {
            password: "normalUser12345",
            normalUser: {
              name: {
                firstName: displayName[0] || "Unknown",
                lastName: displayName[1] || "User",
              },
              gender: "male",
              email: firebaseUser.email,
              contactNo: "01321341234",
              presentAddress: "madhupur",
            },
          };

          const res = await registration(normalUser).unwrap();
          const verifiedUser = verifyToken(firebaseUser.accessToken);
          dispatch(
            setUser({ user: verifiedUser, token: firebaseUser.accessToken })
          );
          toast.success("User registered successfully", {
            id: toastId,
            duration: 2000,
          });
          navigate("/dashboard");
        }
      } catch (error) {
        if (
          error.status === 500 &&
          error.data.message.includes("duplicate key error")
        ) {
          toast.error("User already exists. Please try logging in.", {
            id: toastId,
            duration: 2000,
          });
        } else {
          toast.error("Something went wrong", { id: toastId, duration: 2000 });
        }
        console.error("Login/Registration error:", error);
      }
    };

    handleFirebaseLogin();
  }, [firebaseUser, dispatch, navigate, login, registration, refetchUser]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedUser = result.user;
        loggedUser.accessToken = result._tokenResponse.idToken;
        setFirebaseUser(loggedUser);
      })
      .catch((error) => {
        // console.log("Google Sign-In error:", error.message);
      });
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);

      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.error("Login error:", error);
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword( email ).unwrap();
      console.log("API Response:", response);
      navigate("/auth/forgot-password");
    } catch (err) {
      if (err?.status === 400) {
        console.error("Bad Request: Check payload format and API endpoint");
      } else if (err?.status === 500) {
        console.error("Server Error: Check backend logs for details");
      } else {
        console.error("Unknown Error:", err);
      }
    }
  };
  
  

  return (
    <div className="bg-secondaryColor h-screen w-full flex justify-center items-center">
      <div className="bg-cardBackground w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded-md relative">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl">Hey Buddy</h1>
          <p className="text-5xl font-extrabold text-buttonBackground">
            Welcome
          </p>
          <p className="text-5xl font-extrabold text-buttonBackground">Back!</p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8 rounded-r-md">
          <h3 className="text-3xl font-bold text-buttonBackground mb-4">
            LOGIN
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: "email is required" })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 pr-10 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              <span
                className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className="bg-buttonBackground font-bold text-white focus:outline-none rounded p-3">
              Login
            </button>
            <p
              className="text-xs md:text-sm lg:text-base text-right mt-2 cursor-pointer"
              style={{ color: "#01D676" }}
              onClick={toggleModal}
            >
              Forgot your password?
            </p>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="bg-cardBackground text-white border w-full h-12 rounded-md mt-6 grid place-items-center text-xs shadow-sm"
          >
            <div className="flex gap-3 justify-center items-center">
              <FaGoogle />
              <span>Continue with Google</span>
            </div>
          </button>
          <div className="w-full flex justify-between my-5">
            <Link to={"/"} className="text-primaryColor font-semibold text-sm">
              Back to Home
            </Link>
            <Link
              to={"/register"}
              className="text-cardBackground font-semibold text-sm"
            >
              Go to Registration
            </Link>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative shadow-lg">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors duration-200 rounded-full"
                onClick={toggleModal}
                style={{
                  fontSize: "1.5rem",
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>

              {/* Lock Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: "#01D676" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m0 0h.008m-.008 0H11.992m2.016 0H12m-7-8V8a5 5 0 0110 0v3m-4 4h3v4H8v-4h3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Modal Header */}
              <h2 className="text-center text-2xl font-semibold text-white mb-2">
                Forgot your password?
              </h2>
              <p className="text-center text-gray-400 mb-6">
                Enter your registered email below to receive your password reset
                instructions.
              </p>

              {/* Form */}
              <form onSubmit={sendMail}>
                <label className="block text-gray-400 text-sm font-medium mb-1">
                  Email
                </label>
                <div className="relative mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 transition-all duration-200 transform hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.34 5.106a1.5 1.5 0 001.66 0L19 8m-9 8h8m2-8V6a1 1 0 00-1-1H6a1 1 0 00-1 1v2"
                      />
                    </svg>
                  </span>

                  {/* Email Input Field */}
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-green-500"
                    placeholder="Type your email here..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    required
                  />
                </div>

                {/* Feedback Messages */}
                {isSuccess && (
                  <p className="text-green-500">
                    Password reset link sent successfully!
                  </p>
                )}
                {isError && (
                  <p className="text-red-500">
                    {error?.data?.message ||
                      "An error occurred. Please try again."}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-600 py-2 px-4 rounded-lg text-white hover:bg-gray-600"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-lg text-white transition-colors duration-200"
                    style={{ backgroundColor: "#01D676" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#01B963")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#01D676")
                    }
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Sending..." : "Send Mail"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
