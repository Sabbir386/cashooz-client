import { useNavigate } from "react-router-dom";
import { useFindByEmailUserQuery, useLoginMutation, useRegistrationMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { UAParser } from "ua-parser-js";
import { useSearchParams } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.init";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/features/hooks";
const Register = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceFingerprint, setDeviceFingerprint] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [OSdeviceType, setOSdeviceType] = useState("");
  const [country, setCountry] = useState("");
  const [ip, setIP] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [refId, setrefId] = useState("");
  const [searchParams] = useSearchParams();
  const [showRequirement, setShowRequirement] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
   const { data: userExists, refetch: refetchUser } = useFindByEmailUserQuery(
      firebaseUser?.email,
      {
        skip: !firebaseUser?.email,
      }
    );
  // device tracking ip address
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

  if (deviceInfo) {
    console.log("Device Info:", deviceInfo);
    console.log("IP:", ip);
    console.log("Country:", country);
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const defaultValues = {
    username: "Sabbir",
    email: "sabbir333@gmail.com",
    password: "password12345",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!deviceFingerprint) {
      toast.error("Device fingerprint generation failed.");
      return;
    }
    console.log("deviceFingerprint", deviceFingerprint);
    const toastId = toast.loading("User Registering...");
    const normalUser = {
      password: data.password,
      normalUser: {
        name: data.name,
        email: data.email,
        ip: ip || "",
        device: deviceInfo || "",
        deviceFingerprint: deviceFingerprint || "",
        country: country || "USA",
        designation: "user",
        username: "piterson",
        referredBy: refId || "self",
        gender: "male",
        dateOfBirth: "1985-07-15",
        contactNo: "......",
        emergencyContactNo: "1234567890",
        bloodGroup: "A+",
        presentAddress: "456 Elm Street, Cityville, Country",
        permanentAddress: "789 Maple Avenue, Townsville, Country",
        profileImg: "",
        isDeleted: false,
      },
    };

    try {
      const user = await registration(normalUser);
      // Check if response contains an error status
      console.log(user);
      if (user?.error?.status == 409) {
        // Handle specific error messages
        const errorMessage =
          user?.error?.data?.errorSources[0]?.message || "Conflict error.";
        toast.error(errorMessage, {
          id: toastId,
          duration: 2000,
        });
        console.error("Error:", errorMessage);
        return; // Exit the function here to avoid further processing
      }
      // Success handling
      if (user?.data) {
        toast.success("Registration successful", {
          id: toastId,
          duration: 2000,
        });

        // Add slight delay before navigation for a smooth user experience
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      // Handle unexpected errors from the registration process
      toast.error("Something went wrong. Please try again later.", {
        id: toastId,
        duration: 2000,
      });
      console.error("Registration error:", error);
    }
  };
  // google sign in...

    useEffect(() => {
      const handleFirebaseLogin = async () => {
        console.log(firebaseUser)
        if (!firebaseUser) return;
        console.log(firebaseUser)
        const toastId = toast.loading("Checking user existence...");
        try {
          // Check if the user exists
          const refreshedUser = await refetchUser();
          const userExists = refreshedUser?.data?.data;
    
          console.log("Refetched User Data:", refreshedUser);
    
          if (userExists) {
            // User exists, log them in
            const userInfo = {
              email: userExists.email,
              password: "normalUser12345",
            };
            console.log(userInfo)
    
            const res = await login(userInfo).unwrap();
            console.log("Login Response:", res);
    
            if (res.data?.accessToken) {
              const user = verifyToken(res.data.accessToken);
              console.log("Verified User:", user);
    
              if (user) {
                console.log(res.data?.accessToken)
                dispatch(setUser({ user, token: res.data.accessToken }));
                toast.success("User logged in successfully", { id: toastId });
                navigate("/dashboard");
                return;
              } else {
                throw new Error("Invalid token payload during login");
              }
            } else {
              throw new Error("Login response does not contain accessToken");
            }
          } else {
            // User doesn't exist, register them
            
            const displayName = firebaseUser.displayName
              ? firebaseUser.displayName.split(" ")
              : ["", ""];
            const normalUser = {
              password: "normalUser12345",
              normalUser: {
                name: firebaseUser.displayName || "Unknown",
                gender: "male",
                email: firebaseUser.email,
                contactNo: "..........",
                presentAddress: "madhupur",
                ip: ip || "",
                device: deviceInfo || "",
                deviceFingerprint: deviceFingerprint || "",
                referredBy: refId || "self",
                profileImg: firebaseUser.photoURL || "",
              },
            };
    
            console.log("Registering new user:", normalUser);
    
            const registeredUser = await registration(normalUser).unwrap();
            console.log("Registration Response:", registeredUser);
    
            if (registeredUser) {
              // Refetch user after registration
              const refreshedUserAfterRegistration = await refetchUser();
              const userExistsAfterRegistration =
                refreshedUserAfterRegistration?.data?.data;
    
              console.log(
                "User After Registration:",
                refreshedUserAfterRegistration
              );
    
              if (userExistsAfterRegistration) {
                const userInfo = {
                  email: userExistsAfterRegistration.email,
                  password: "normalUser12345",
                };
    
                const res = await login(userInfo).unwrap();
                console.log("Login Response After Registration:", res);
    
                if (res.data?.accessToken) {
                  const user = verifyToken(res.data.accessToken);
                  console.log("Verified User After Registration:", user);
    
                  if (user) {
                    dispatch(setUser({ user, token: res.data.accessToken }));
                    toast.success("User registered and logged in successfully", {
                      id: toastId,
                    });
                    navigate("/dashboard");
                    return;
                  } else {
                    throw new Error(
                      "Invalid token payload after registration login"
                    );
                  }
                } else {
                  throw new Error(
                    "Login response does not contain accessToken after registration"
                  );
                }
              } else {
                throw new Error("Failed to verify user existence after registration");
              }
            } else {
              throw new Error("Registration failed");
            }
          }
        } catch (error) {
          console.log(error)
          toast.error("Something went wrong during login/registration", {
            id: toastId,
          });
          console.error("Error during login/registration:", error);
        }
      };
    
      handleFirebaseLogin();
    }, [
      firebaseUser,
      dispatch,
      navigate,
      login,
      registration,
      refetchUser,
      ip,
      deviceInfo,
      deviceFingerprint,
      refId,
    ]);
    
  
    const handleGoogleSignIn = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const loggedUser = result.user;
          loggedUser.accessToken = result._tokenResponse.idToken;
          console.log(loggedUser);
          setFirebaseUser(loggedUser);
        })
        .catch((error) => {
          console.error("Google Sign-In error:", error.message);
        });
    };
 
  
  // console.log(refId)
  return (
    <div className="bg-secondaryColor min-h-screen w-full flex justify-center items-center mt-20">
      <div className="bg-cardBackground w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded-md">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl">Hello</h1>
          <p className="text-5xl font-extrabold text-buttonBackground">
            Welcome!
          </p>
          <p className="text-5xl font-extrabold text-buttonBackground">
            To Cashooz
          </p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8 rounded-r-md">
          {/* <h3 className="text-3xl font-bold text-buttonBackground mb-4">
            REGISTER
          </h3> */}
          <div className="flex flex-col items-start p-4  rounded-md bg-white w-full">
            <div className="w-full flex flex-wrap justify-between">
              <div className="text-xl font-semibold">Join for free!</div>
              <div className="text-green-600 text-xl font-bold bg-green-200 px-3 py-1 rounded">
                500 CZ Bonus
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start my-4">
            <div className="mr-2 text-green-500 text-2xl">➜</div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2 mt-1 h-5 w-5 border-gray-300 rounded"
            />
            <div className="text-xs text-gray-700">
              I agree to the{" "}
              <Link to="/termsncondition" className="text-blue-500 underline">
                Terms of Use
              </Link>{" "}
              and to receive marketing email messages from Cashooz, and I accept
              the{" "}
              <Link to={"/privecy-policy"} className="text-blue-500 underline">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            {/* Name field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* Email field with format validation */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {/* Password field with eye icon and strong password hint */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                    message:
                      "Password must contain a lowercase letter, an uppercase letter, a number, and a special character",
                  },
                })}
                className="w-full p-3 pr-10 rounded border placeholder-gray-400 focus:outline-none focus:border-cardBackground text-cardBackground"
                onFocus={() => setShowRequirement(true)} // Show the requirement when input is focused
                onBlur={() => setShowRequirement(false)} // Optionally hide it when the user leaves the input
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
              {showRequirement && (
                <p className="text-sm mt-2 text-gray-500">
                  Password must be at least 8 characters long, contain a
                  lowercase letter, an uppercase letter, a number, and a special
                  character (e.g., #, !, @, etc.).
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Referral ID"
                {...register("refId")}
                defaultValue={refId || ""}
                disabled={!!refId}
                className={`w-full p-3 rounded border placeholder-gray-400 focus:outline-none text-cardBackground 
            ${
              refId
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "focus:border-cardBackground"
            }
           `}
              />
            </div>

            <button
              disabled={!isChecked}
              className={`font-bold text-white uppercase focus:outline-none rounded p-3 ${
                isChecked
                  ? "bg-buttonBackground" // Button color when enabled
                  : "bg-gray-400 cursor-not-allowed" // Button color when disabled
              }`}
            >
              Register
            </button>
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
            <div className="text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-buttonBackground text-sm font-bold"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
