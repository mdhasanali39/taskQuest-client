import { MdOutlineAddTask } from "react-icons/md";
import Task from "./Task";
import PropTypes from "prop-types";
import { useState } from "react";
import CreateTask from "../CreateTask/CreateTask";

const TaskCard = ({ sectionName, isCreateTask }) => {
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

        <Task />

        {isCreateTask && (
          <div className="px-2 py-1  w-min whitespace-nowrap rounded-lg  font-bold absolute bottom-2 right-2">
            <MdOutlineAddTask
              size={24}
              onClick={() => setIsAddIconClicked(true)}
              onMouseEnter={() => setIsMouseEntered(true)}
              onMouseLeave={() => setIsMouseEntered(false)}
            />
            <span
              className={`
              absolute -bottom-[100%] right-0 z-[100] text-action-text bg-primary-bg border px-3 rounded-md transition-opacity ease-linear duration-200 ${
                isMouseEntered ? "opacity-100" : "opacity-0"
              }`}
            >
              Create new task
            </span>
          </div>
        )}
        {
            isAddIconClicked && <CreateTask setIsAddIconClicked={setIsAddIconClicked}/>
        }
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  sectionName: PropTypes.string.isRequired,
  isCreateTask: PropTypes.bool.isRequired,
};

export default TaskCard;
