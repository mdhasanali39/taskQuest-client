import { IoMdAddCircleOutline } from "react-icons/io";
import Task from "./Task";
import PropTypes from "prop-types";
import { useState } from "react";
import CreateTask from "../CreateTask/CreateTask";

const TaskCard = ({ sectionName, isCreateTask, tasks, refetch }) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isAddIconClicked, setIsAddIconClicked] = useState(false);
  return (
    <div>
      <h3 className="text-xl text-gray-600 font-bold my-4">{sectionName}</h3>
      <div
        className={`relative min-h-[200px] bg-primary-bg rounded-lg shadow-xl border border-action-text border-opacity-10 pb-14
        `}
      >
        {/* show tasks  */}
        {tasks?.length > 0 &&
          tasks.map((task) => (
            <Task
              key={task._id}
              id={task._id}
              taskName={task.taskName}
              taskDescription={task.taskDescription}
              taskPriority={task.priority}
              status={task.status}
              taskDeadline={task.taskDeadline}
              refetch={refetch}
            />
          ))}

        {isCreateTask && (
          <div className="px-2 py-1  w-min whitespace-nowrap rounded-lg  font-bold absolute bottom-2 right-2">
            <span 
            onClick={() => setIsAddIconClicked(true)}
              onMouseEnter={() => setIsMouseEntered(true)}
              onMouseLeave={() => setIsMouseEntered(false)}
            className="flex items-center gap-1 text-sm text-blue-600 cursor-pointer">
            New Task
            <IoMdAddCircleOutline
              size={20}/>
            
            </span>
            <span
              className={`
              absolute -bottom-[120%] -right-2 z-[100] text-action-text bg-primary-bg border px-3 rounded-md transition-opacity ease-linear duration-200 ${
                isMouseEntered ? "opacity-100" : "opacity-0"
              }`}
            >
              Create new task
            </span>
          </div>
        )}
        {isAddIconClicked && (
          <CreateTask
            setIsAddIconClicked={setIsAddIconClicked}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  sectionName: PropTypes.string.isRequired,
  isCreateTask: PropTypes.bool,
  tasks: PropTypes.array,
  refetch: PropTypes.func,
};

export default TaskCard;
