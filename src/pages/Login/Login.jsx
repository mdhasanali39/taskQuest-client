/* eslint-disable react/no-unescaped-entities */
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { accessToken } from "../../api/auth";
import  {useForm} from 'react-hook-form'

const Login = () => {
    const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {handleSubmit, register, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    const {email, password} = data;
    
    // create user
    signIn(email, password)
      .then(async(result) => {
        if (result.user.email) {
          await accessToken(result.user.email)
          toast.success("Your login successful");
          navigate("/",{replace:true});
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/invalid-credential") {
          toast.error("Invalid email or password");  
        }
        toast.error("An error occurred during login");
      });
  };

  // easy login with google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result?.user?.email) {
        await accessToken(result?.user?.email)
        toast.success("Login with google Successful");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="w-full sm:w-3/4 lg:w-[50%] xl:w-3/5 mx-auto min-h-[86vh] my-14 px-4">
      <div className="shadow-lg rounded-lg p-8 border">
        <h2 className="text-center font-semibold text-3xl">
          Create a new account
        </h2>
        {/* easy login  */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleGoogleLogin}
            className="flex gap-3 items-center border rounded-md p-3"
          >
            <span className="text-action-text text-2xl">
              <FcGoogle />
            </span>
            <span>Continue with Google </span>
          </button>
        </div>
        {/* separator  */}
        <div className="flex gap-3 items-center justify-center pb-8">
          <span className="border w-[100px] h-[5px] bg-action-bg"></span>
          <span className="text-3xl font-bold text-black-text">Or</span>
          <span className="border w-[100px] h-[5px] bg-action-bg"></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* user email  */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-lg text-black-text font-semibold "
              >
                Your Email
              </label>
              <input
                type="email"
                {...register('email', {required:"Please provide your Email"})}
                id="email"
                placeholder="Your Email"
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
              {errors.email && <span className="text-red-500 font-medium">{errors.email.message}</span>}
            </div>
            {/* user password  */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-lg text-black-text font-semibold "
              >
                Your Password
              </label>
              <input
                type="password"
                {...register("password", {required:"Please provide correct password"})}
                id="password"
                placeholder="Your Password"
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
              {errors.password && <span className="text-red-500 font-medium">{errors.password.message}</span>}
            </div>
            {/* login button  */}
            <div className="text-center py-7">
              <button
                type="submit"
                className="text-lg text-white font-semibold px-7 py-2 rounded-lg bg-action-bg border hover:bg-white hover:text-black hover:border-action-text transition ease-linear duration-300"
              >
                Login
              </button>
            </div>
            {/* already have an account */}
            <p className="text-center text-black-text text-lg">
              Don't have an account ?
              <Link
                to={"/register"}
                className="text-action-text ml-1 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;