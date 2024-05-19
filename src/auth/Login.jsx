const Login = () => {
    return (
        <>
        <div className="bg-gradient-to-tr from-purple-300 to-green-600 h-screen w-full flex justify-center items-center">
            <div className="bg-blue-600 w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
            <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
                <h1 className="text-3xl">Hello</h1>
                <p className="text-5xl font-extrabold">Welcome!</p>
                <p className="text-5xl font-extrabold">To Cashooz</p>
            </div>
            <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                LOGIN
                </h3>
                <form action="#" className="w-full flex flex-col justify-center">
                <div className="mb-4">
                    <input type="email" placeholder="Email" className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600" />
                </div>
                <div className="mb-4">
                    <input type="password" placeholder="Password" className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-blue-600" />
                </div>
                <button className="bg-blue-600 font-bold text-white focus:outline-none rounded p-3">
                    Submit
                </button>
                </form>
            </div>
        </div>
        </div>


        </>
    );
  };
  
  export default Login;
  