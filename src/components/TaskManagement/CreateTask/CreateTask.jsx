import { IoIosCloseCircleOutline } from "react-icons/io";
import {useForm} from 'react-hook-form'
import { createTask } from "../../../api/crud";
import useAuth from "../../../hooks/useAuth";
import toast from 'react-hot-toast'

const CreateTask = ({setIsAddIconClicked}) => {
  const {user} = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      
    
      const onSubmit = async(data) => {
        try {
            const result = await createTask({...data, status:"todo", userEmail:user?.email}) 
          if(result?.acknowledge){
            setIsAddIconClicked(false)
            toast.success("Your task added successfully")
          }
        } catch (err) {
          console.log(err.message);
        }
      }

    return (
        <div className=" w-3/4 lg:w-1/4 bg-white mt-1 p-4 pt-12 fixed z-[100] shadow-xl rounded-lg border-t-[5px] border-t-action-text left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2">
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3">
        {/* task name  */}
        <input
          type="text"
          placeholder="Task Name"
          {...register("taskName")}
          required
          className="px-2 py-2 outline-none border rounded-md"
        />
        
        {/* task deadline */}
        <input
          type="date"
          {...register("taskDeadline")}
          required
          className="px-2 py-2 outline-none border rounded-md"
        />
        {/* task priority */}
        <select {...register("priority")}>
          <option>Select Priority</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        {/* task description */}
        <textarea
          type="text"
          placeholder="Task Description"
          {...register("taskDescription")}
          className="px-2 py-2 outline-none border rounded-md"
        ></textarea>
        <div className="text-center py-4">
          <button
            type="submit"
            className="text-lg text-white font-semibold px-5 py-1 rounded-lg bg-action-bg border hover:bg-white hover:text-black hover:border-action-text transition ease-linear duration-300"
          >
            Create
          </button>
        </div>
      </form>
      <IoIosCloseCircleOutline
      onClick={()=>setIsAddIconClicked(false)}
       size={28} className="absolute top-1 right-1" />
    </div>
    );
};

export default CreateTask;