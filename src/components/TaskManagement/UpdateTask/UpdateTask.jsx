import { useForm } from "react-hook-form";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { updateTask } from "../../../api/crud";
import toast from "react-hot-toast";

const UpdateTask = ({
  id,
  setIsEditIconClicked,
  taskName,
  taskDescription,
  taskPriority,
  taskDeadline,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await updateTask(id, data);
      if (result?.status) {
        setIsEditIconClicked(false);
        refetch();
        toast.success("Your task updated successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className=" w-3/4 lg:w-1/4 bg-white mt-1 p-4 pt-12 fixed z-[900] shadow-xl rounded-lg border-t-[5px] border-t-action-text left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* task name  */}
        <input
          type="text"
          placeholder="Task Name"
          {...register("taskName", { required: true })}
          defaultValue={taskName}
          required
          className="px-2 py-2 outline-none border rounded-md"
        />
        {/* errors will return when field validation fails  */}
        {errors.taskName && (
          <span className="text-red-500 font-medium">
            Please insert task name{" "}
          </span>
        )}

        {/* task deadline */}
        <input
          type="date"
          {...register("taskDeadline", { required: true })}
          defaultValue={taskDeadline}
          required
          className="px-2 py-2 outline-none border rounded-md"
        />
        {/* errors will return when field validation fails  */}
        {errors.taskDeadline && (
          <span className="text-red-500 font-medium">Please select date</span>
        )}

        {/* task priority */}
        <select
          {...register("priority", { required: true })}
          defaultValue={taskPriority}
        >
          <option disabled>Select Priority</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        {/* task description */}
        <textarea
          type="text"
          placeholder="Task Description"
          {...register("taskDescription", { required: true })}
          defaultValue={taskDescription}
          className="px-2 py-2 outline-none border rounded-md"
        ></textarea>
        {/* errors will return when field validation fails  */}
        {errors.taskDescription && (
          <span className="text-red-500 font-medium">
            Please insert task description
          </span>
        )}

        <div className="text-center py-4">
          <button
            type="submit"
            className="text-lg text-white font-semibold px-5 py-1 rounded-lg bg-action-bg border hover:bg-white hover:text-black hover:border-action-text transition ease-linear duration-300"
          >
            Update
          </button>
        </div>
      </form>
      <IoIosCloseCircleOutline
        onClick={() => setIsEditIconClicked(false)}
        size={28}
        className="absolute top-1 right-1"
      />
    </div>
  );
};
UpdateTask.propTypes = {
  setIsEditIconClicked: PropTypes.func,
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  taskPriority: PropTypes.string,
  status: PropTypes.string,
  taskDeadline: PropTypes.string,
  id: PropTypes.string,
  refetch: PropTypes.func,
};

export default UpdateTask;
