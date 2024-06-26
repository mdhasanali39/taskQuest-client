import { FaRegCircleCheck } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { RiEditCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useState } from "react";
import UpdateTask from "../UpdateTask/UpdateTask";
import { deleteTask, updateTaskStatus } from "../../../api/crud";
import toast from "react-hot-toast";

const Task = ({ id, taskName, taskDescription, taskPriority, status,taskDeadline,refetch }) => {

  const [isEditIconClicked,setIsEditIconClicked] = useState(false)

  // handle ongoing - make task status to ongoing 
  const handleOngoing = async() =>{
    try {
      const result = await updateTaskStatus(id,{status:"ongoing"})
      if(result?.status){
        toast.success(`Status has changed to ongoing`)
        refetch()
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleComplete = async() =>{
    try {
      if(!refetch) return;
      const result = await updateTaskStatus(id,{status:"completed"})
      if(result?.status){
        toast.success(`Status has changed to completed`)
        refetch()
      }
    } catch (err) {
      console.log(err);
    }
  }
  // delete task 
  const handleDelete = async() =>{
    const result = await deleteTask(id)
    if(result?.acknowledge?.deletedCount > 0){
      toast.success("Your task deleted successfully");
      refetch()
    }
  }


  return (
    <div
      className={`relative w-[95%] mx-auto bg-white shadow-md rounded-lg px-2 py-[6px] mt-3`}
    >
      <h3 className="font-semibold text-gray-600">{taskName}</h3>
      <p className="text-sm">{taskDescription}</p>
      <p className="text-sm font-bold px-2 py-1 bg-action-bg text-white rounded-lg w-min whitespace-nowrap mt-2">
        {taskPriority}
      </p>
      <div className="flex gap-2 absolute right-3 bottom-2">
        {status === "todo" && (
          <div className="flex gap-2 items-center">
            <span
              onClick={()=>setIsEditIconClicked(true)}
              className="flex gap-1 items-center border rounded-lg shadow-sm cursor-pointer px-2 text-sm hover:border-action-text transition ease-linear duration-200"
            >
              <RiEditCircleLine size={16} />
              Edit
            </span>
            <span
              onClick={handleOngoing}
              className="flex gap-1 items-center border rounded-lg shadow-sm cursor-pointer px-2 text-sm hover:border-action-text transition ease-linear duration-200"
            >
              <FaRegArrowAltCircleRight size={16} />
              OnGoing
            </span>
          </div>
        )}
        {status === "ongoing" && (
          <span
            onClick={handleComplete}
            className="flex gap-1 items-center border rounded-lg shadow-sm cursor-pointer px-2 text-sm hover:border-action-text transition ease-linear duration-200"
          >
            <FaRegCircleCheck size={16} />
            Complete
          </span>
        )}
        {status === "completed" && (
          <span
            onClick={handleDelete}
            className="flex gap-1 items-center border text-red-500 rounded-lg shadow-sm cursor-pointer px-2 hover:border-red-700 transition ease-linear duration-200 text-sm"
          >
            <TiDeleteOutline size={18} className="" />
            Delete
          </span>
        )}
        {/* show update task modal here  */}
        {
          isEditIconClicked && <UpdateTask id={id} setIsEditIconClicked={setIsEditIconClicked} taskName={taskName} taskDescription={taskDescription} taskPriority={taskPriority} taskDeadline={taskDeadline} refetch={refetch} />
        }
      </div>
    </div>
  );
};

Task.propTypes = {
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  taskPriority: PropTypes.string,
  status: PropTypes.string,
  taskDeadline: PropTypes.string,
  id: PropTypes.string,
  refetch: PropTypes.func,
}

export default Task;
