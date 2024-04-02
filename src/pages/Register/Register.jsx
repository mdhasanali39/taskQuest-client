import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { accessToken } from "../../api/auth";
import  {useForm} from 'react-hook-form'
import { IoMdRefresh } from "react-icons/io";
import { FaCamera } from "react-icons/fa6";
import { saveImage } from "../../utils/utils";


const Register = () => {
  const {createUser,signInWithGoogle,updateUserProfile} = useAuth()
  const [whichPhotoSelected, setWhichPhotoSelected] = useState(null);
  const navigate = useNavigate();


  const {handleSubmit, register, formState: {errors}} = useForm()

  // for false the page load

  const onSubmit = async (data) => {
    const {name,email,password,photo} = data;

    // get the photo display_url after uploading image on imgbb 
    const image = photo[0]
    const result = await saveImage(image)
    const imageUrl =  result?.data?.display_url;

    // create user
    try{
      const result = await createUser(email, password)
      // update user profile 
      await updateUserProfile(name,imageUrl)
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

    // console.log(data,image);
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name", {required:"Please provide your name"})}
                id="name"
                placeholder="Your Name"
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
              {errors.name && <span className="text-red-500 font-medium">{errors.name.message}</span>}
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
                {...register("email",{required:"Please provide your email"})}
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
                {...register("password",{required:"Please provide your password",minLength:{
                  value:6,
                  message:"Password should be at least 6 characters"
                },pattern:{
                  value: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/,
                  message:"Password should contain at least one capital letter and one special character"
                }})}
                id="password"
                placeholder="Your Password"
                className=" outline-none border placeholder-black px-3 py-4 rounded-md"
              />
              {errors.password && <span className="text-red-500 font-medium">{errors.password.message}</span>}
            </div>
            {/* user photo url  */}
            <div className="flex justify-center w-full">
            <label
              title={whichPhotoSelected}
              htmlFor="photo"
              className="flex gap-2 justify-center items-center px-2 w-full border-dotted border-[3px] border-blue-500/25 py-1"
            >
              {/* if photo selected then showing photo name or showing Profile Photo */}
              <span className="font-semibold">
                {whichPhotoSelected
                  ? whichPhotoSelected.length > 25
                    ? whichPhotoSelected.slice(0, 25)
                    : whichPhotoSelected
                  : "Profile Photo"}
              </span>
              {/* if photo selected then showing refresh icon or showing camera icon  */}
              {whichPhotoSelected ? (
                <IoMdRefresh size={30} className="text-text-color-blue" />
              ) : (
                <FaCamera size={30} className="text-text-color-blue" />
              )}
              <input
                onInput={(e) =>
                  setWhichPhotoSelected(e.target?.files[0]?.name)
                }
                {...register("photo",{required:"Please upload your photo"})}
                id="photo"
                className="appearance-none absolute -top-[1000px] bg-transparent border-none text-gray-700 mr-3 leading-tight focus:outline-none"
                type="file"
                accept="image/*"
              />
              {errors.photo && <span className="text-red-500 font-medium">{errors.photo.message}</span>}
            </label>
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