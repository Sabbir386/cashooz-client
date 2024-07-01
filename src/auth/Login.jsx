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
import { FaGoogle  } from "react-icons/fa";
import { Link } from "react-router-dom";


const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login] = useLoginMutation();
  const [registration] = useRegistrationMutation();
  const { data: userExists, refetch: refetchUser } = useFindByEmailUserQuery(firebaseUser?.email, {
    skip: !firebaseUser?.email,
  });

  useEffect(() => {
    const handleFirebaseLogin = async () => {
      if (!firebaseUser) return;

      const toastId = toast.loading("Checking user existence...");
      try {
        const userCheck = await refetchUser();

        if (userCheck.data) {
          console.log('User exists:', userCheck.data);
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
          console.log('User does not exist, registering new user');
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
          dispatch(setUser({ user: verifiedUser, token: firebaseUser.accessToken }));
          toast.success("User registered successfully", { id: toastId, duration: 2000 });
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.status === 500 && error.data.message.includes("duplicate key error")) {
          toast.error("User already exists. Please try logging in.", { id: toastId, duration: 2000 });
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
        console.log("Google Sign-In error:", error.message);
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
  return (
    <div className="bg-gradient-to-tr from-purple-300 to-green-600 h-screen w-full flex justify-center items-center">
      <div className="bg-blue-600 w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl">Hello</h1>
          <p className="text-5xl font-extrabold">Welcome!</p>
          <p className="text-5xl font-extrabold">To Cashooz</p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
          <h3 className="text-3xl font-bold text-blue-600 mb-4">LOGIN</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: "email is required" })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="bg-blue-600 font-bold text-white focus:outline-none rounded p-3">
              Submit
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="border w-full h-8 rounded-md mt-6 grid place-items-center text-xs shadow-sm"
          >
           <div className="flex gap-3 justify-center items-center">
           <FaGoogle /> 
           <span>Continue with Google</span>
           </div>
          </button>
          <div className="w-full flex justify-between my-5">
              <Link to={'/'} className="text-red-600 font-semibold text-sm">Back to Home</Link>
              <Link to={'/register'} className="text-blue-600 font-semibold text-sm">Go to Registration</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
