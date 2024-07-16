import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateAdvertiserMutation } from "../pages/advertiserApi";

const AdvertiserRegister = () => {
  const navigate = useNavigate();
  const [createAdvertiser] = useCreateAdvertiserMutation();
  const defaultValues = {
    name: "Sabbir",
    email: "sabbir333@gmail.com",
    password: "password12345",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Advertiser Registering...");
    try {
      const advertiser = {
        password: data.password,
        advertiser: {
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
          isDeleted: false
          
        },
      };

       console.log("Registration data:", advertiser);
      await createAdvertiser(advertiser);
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      // navigate("/login");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.error("Registration error:", error);
    }
  };
  return (
    <>
      <div className="bg-blue-600 h-full md:h-screen py-10 w-full flex justify-center items-center">
        <div className="w-full sm:w-1/0 md:w-12/12 lg:w-1/1 flex flex-col md:flex-row items-center lg:mx-24 mx-5">
          <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
            <h1 className="text-2xl">Hello</h1>
            <p className="text-4xl font-extrabold">Welcome!</p>
            <p className="text-4xl font-extrabold">To Cashooz</p>
          </div>
          <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-8 px-8 rounded">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">
             Advertiser Registration
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              className="w-full flex flex-col justify-center"
            >
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                  Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
               
                
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              
              <div className="mb-2 flex">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  className="block mb-2 ml-1 text-sm font-medium text-gray-900"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              <button className="bg-blue-600 font-bold text-white focus:outline-none rounded p-2.5">
                Submit
              </button>
              <div className=""></div>
            </form>
            <div className="w-full flex justify-between my-5">
              <Link to={"/"} className="text-red-600 font-semibold text-sm">
                Back to Home
              </Link>
              <Link
                to={"/login"}
                className="text-blue-600 font-semibold text-sm"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiserRegister;
