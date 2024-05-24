import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/features/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        // id: data.id,
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
        </div>
      </div>
    </div>
  );
};

export default Login;
