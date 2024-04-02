import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { accessToken } from "../../api/auth";

const Register = () => {
  const {createUser,signInWithGoogle,updateUserProfile} = useAuth()
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // for false the page load

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form["photo-url"].value;

    if (password.length < 6) {
      toast.error("Password should at least 6 characters");
      return;
    }
    if (!/(?=.*?[A-Z])/.test(password)) {
      toast.error("Password should at least one capital letter");
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      toast.error("Password should at least one special character");
      return;
    }

    // create user
    try{
      const result = await createUser(email, password)
      // update user profile 
      await updateUserProfile(name,photo)
      console.log(result?.user);
      
      if(result?.user?.email){
        await accessToken(result.user.email)
        toast.success("Account created successfully");
        navigate('/', {replace:true})
        window.location.reload()
      }
    }catch (err){
      console.log(err);
      // toast.error(err.message.split(" ")[2].split("/")[1].slice(0, -2));
    }

    console.log(name, email, photo, password);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if(result?.user?.email){
        await accessToken(result?.user?.email)
        toast.success("Login with google Successful")
        navigate('/', {replace:true})
      }
    } catch (err) {
      console.log(err.message)
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

        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            {/* user name  */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-lg text-black-text font-semibold "
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
            </div>
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
                name="email"
                id="email"
                placeholder="Your Email"
                required
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
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
                name="password"
                id="password"
                placeholder="Your Password"
                required
                onFocus={() => setIsFocused(true)}
                // onChange={(e) => setPassword(e.target.value)}
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
              {isFocused && (
                <p className="text-green-500">
                  Password should at least 6 characters, at least one capital
                  letter and at least one special character
                </p>
              )}
            </div>
            {/* user photo url  */}
            <div className="flex flex-col">
              <label
                htmlFor="photo-url"
                className="text-lg text-black-text font-semibold "
              >
                Your Photo Url
              </label>
              <input
                type="url"
                name="photo-url"
                id="photo-url"
                placeholder="Your Photo Url"
                required
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
            </div>
            {/* register button  */}
            <div className="text-center py-7">
              <button
                type="submit"
                className="text-lg text-white font-semibold px-7 py-2 rounded-lg bg-action-bg border hover:bg-white hover:text-black hover:border-action-text transition ease-linear duration-300"
              >
                Register
              </button>
            </div>
            {/* already have an account */}
            <p className="text-center text-black-text text-lg">
              Already have an account ?
              <Link
                to={"/login"}
                className="text-action-text ml-1 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;