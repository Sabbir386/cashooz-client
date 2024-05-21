import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
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
    const toastId = toast.loading("Registering...");
    try {
      const normalUser = {
        password: data.password,
        normalUser: {
          name: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          gender: 'male', // Assuming gender is available in your data
          email: data.email,
          contactNo: data.contactNo,
          presentAddress: data.presentAddress,
          // You can add other fields as needed
        },
      };

      console.log("Registration data:", normalUser);
      await registration(normalUser);
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      navigate('/login')
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.error("Registration error:", error);
    }
  };
  return (
    <>
      <div className="bg-blue-600 h-full py-10 w-full flex justify-center items-center">
        <div className="w-full sm:w-1/0 md:w-12/12 lg:w-1/1 flex flex-col md:flex-row items-center lg:mx-24 mx-5">
          <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
            <h1 className="text-2xl">Hello</h1>
            <p className="text-4xl font-extrabold">Welcome!</p>
            <p className="text-4xl font-extrabold">To Cashooz</p>
          </div>
          <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-8 px-8 rounded">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">
              Register Here
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
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Due"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    {...register("contactNo", {
                      required: "Phone Number is required",
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
                <div className="">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <select
                    {...register("role", { required: "Role is required" })}
                    id="role"
                    className="w-full p-2 rounded border text-gray-400 focus:outline-none focus:border-blue-600"
                  >
                    <option selected>user</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="advertiser">advertiser</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <textarea
                  name=""
                  id=""
                  placeholder="Address"
                  {...register("presentAddress", {
                    required: "Address is required",
                  })}
                  className="w-full p-2 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600"
                ></textarea>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
