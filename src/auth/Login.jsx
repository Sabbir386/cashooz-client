import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
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
import ForgotPasswordModal from "./ForgotPasswordModal";
import { UAParser } from "ua-parser-js";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
   const [deviceInfo, setDeviceInfo] = useState("");
    const [deviceFingerprint, setDeviceFingerprint] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [OSdeviceType, setOSdeviceType] = useState("");
    const [country, setCountry] = useState("");
    const [ip, setIP] = useState("");
    const [CountryCode, setCountryCode] = useState("");
    const [refId, setrefId] = useState("");
    const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();
  const [registration] = useRegistrationMutation();
  const { data: userExists, refetch: refetchUser } = useFindByEmailUserQuery(
    firebaseUser?.email,
    {
      skip: !firebaseUser?.email,
    }
  );
  useEffect(() => {
    const getDeviceInfo = async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      const os = result.os.name || "Unknown OS";
      let deviceType = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown Browser";

      const userAgent = navigator.userAgent.toLowerCase();
      let deviceName = "Unknown Device";

      if (userAgent.includes("iphone")) deviceName = "iPhone";
      else if (userAgent.includes("ipad")) deviceName = "iPad";
      else if (userAgent.includes("samsung")) deviceName = "Samsung";
      else if (userAgent.includes("xiaomi")) deviceName = "Xiaomi";
      else if (userAgent.includes("huawei")) deviceName = "Huawei";
      else if (userAgent.includes("pixel")) deviceName = "Google Pixel";
      else if (userAgent.includes("oneplus")) deviceName = "OnePlus";
      else if (userAgent.includes("nokia")) deviceName = "Nokia";
      else if (userAgent.includes("sony")) deviceName = "Sony";
      else if (userAgent.includes("lg")) deviceName = "LG";
      else if (userAgent.includes("htc")) deviceName = "HTC";
      else if (userAgent.includes("motorola")) deviceName = "Motorola";

      let deviceInfo = `OS: ${os}, Device Type: ${deviceType}, Device Name: ${deviceName}, Browser: ${browser}`;

      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        setIP(ip);

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const locationData = await locationResponse.json();
        const country = locationData.country_name;
        const countryCode = locationData.country_code;

        deviceInfo += `, IP: ${ip}, Country: ${country}, CountryCode: ${countryCode}`;
        setCountry(country);
        setCountryCode(countryCode);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }

      setDeviceInfo(deviceInfo);
      setDeviceType(deviceType);
    };

    const generateDeviceFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceFingerprint(result.visitorId);
    };

    getDeviceInfo();
    generateDeviceFingerprint();

    const refIdFromURL = searchParams.get("refId");
    if (refIdFromURL) setrefId(refIdFromURL);
  }, [searchParams]);
  useEffect(() => {
    const handleFirebaseLogin = async () => {
      if (!firebaseUser) return;

      const toastId = toast.loading("Checking user existence...");
      try {
        const userCheck = await refetchUser();

        if (userCheck?.data && userCheck.data.length > 0) {
          // Existing user: Log in
          const userInfo = {
            email: firebaseUser.email,
            password: "normalUser12345",
          };
          const res = await login(userInfo).unwrap();

          if (res.data?.accessToken) {
            const user = verifyToken(res.data.accessToken);
            dispatch(setUser({ user, token: res.data.accessToken }));
            toast.success("Logged in", { id: toastId });
            navigate("/dashboard");
          } else {
            throw new Error("Login response does not contain accessToken");
          }
        } else {
          // New user: Register
          const displayName = firebaseUser.displayName
            ? firebaseUser.displayName.split(" ")
            : ["", ""];
          const normalUser = {
            password: "normalUser12345",
            normalUser: {
              name: displayName[0] || "Unknown",
              gender: "male",
              email: firebaseUser.email,
              contactNo: "01321341234",
              presentAddress: "madhupur",
              ip: ip || "",
              device: deviceInfo || "",
              deviceFingerprint: deviceFingerprint || "",
              referredBy: refId || "self",
              profileImg: "",
            },
          };

          await registration(normalUser).unwrap();

          // Use Firebase access token for Redux
          const verifiedUser = verifyToken(firebaseUser.accessToken);
          dispatch(
            setUser({ user: verifiedUser, token: firebaseUser.accessToken })
          );
          toast.success("User registered successfully", { id: toastId });
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
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
        console.error("Google Sign-In error:", error.message);
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
      console.log(error)
      const errorMessage = error?.data?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
      console.error("Login error:", error);
      console.error("Login error:", error);
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
                {...register("email", { required: "Email is required" })}
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
              onClick={() => setIsModalOpen(true)}
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
          <ForgotPasswordModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Login;
