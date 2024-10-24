import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
    const toastId = toast.loading("User Registering...");
    try {
      const normalUser = {
        password: data.password,
        normalUser: {
          name: data.name,
          email: data.email,
          designation: "Advertiser manager",
          username: "sharukh Khan",
          gender: "male",
          dateOfBirth: "1985-07-15",
          contactNo: "9876543210",
          emergencyContactNo: "1234567890",
          bloodGroup: "A+",
          presentAddress: "456 Elm Street, Cityville, Country",
          permanentAddress: "789 Maple Avenue, Townsville, Country",
          profileImg: "profile_picture.jpg",
          isDeleted: false,
        },
      };

      await registration(normalUser);
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="bg-secondaryColor h-screen w-full flex justify-center items-center">
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
          <h3 className="text-3xl font-bold text-buttonBackground mb-4">
            REGISTER
          </h3>
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
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain an uppercase letter, a number, and a special character",
                  },
                })}
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
              <p className="text-sm mt-2 text-gray-500">
                Password must be at least 8 characters long, contain an
                uppercase letter, a number, and a special character.
              </p>
            </div>

            <div className="flex flex-col items-start p-4  rounded-md bg-white w-80">
              <div className="w-full flex justify-between">
                <div className="text-xl font-semibold">Join for free!</div>
                <div className="text-green-600 text-xl font-bold bg-green-200 px-3 py-1 rounded">
                  $5 Bonus
                </div>
              </div>
              <div className="mt-4 flex items-start">
                <div className="mr-2 text-green-500 text-2xl">➜</div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2 mt-1 h-5 w-5 border-gray-300 rounded"
                />
                <div className="text-xs text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 underline">
                    Terms of Use
                  </a>{" "}
                  and to receive marketing email messages from InboxDollars, and
                  I accept the{" "}
                  <a href="#" className="text-blue-500 underline">
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
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
