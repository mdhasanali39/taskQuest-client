import { IoMdAddCircleOutline } from "react-icons/io";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Task from "./Task";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CreateTask from "../CreateTask/CreateTask";

const TaskCard = ({
  sectionName,
  isCreateTask,
  tasks,
  totalTasks,
  refetch,
  pageSize,
  currentPage,
  setCurrentPage,
  handlePageChange,
  setTaskStatus,
  taskStatus,
}) => {
  // const [currentSectionName, setCurrentSectionName] = useState('')
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isAddIconClicked, setIsAddIconClicked] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 53) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(totalTasks / pageSize));
  }, [pageSize, totalTasks]);

  // change page number dynamically
  const changePageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTaskStatus(taskStatus);
    handlePageChange(taskStatus, pageNumber)
  };

  // get page number buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePageNumber(i)}
          disabled={i === currentPage}
          className={`px-2 bg-blue-400 text-white mr-1 rounded-md ${
            i === currentPage && "bg-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // handle prev page
  const handlePrev = () => {
    changePageNumber(currentPage -1)
  };
  // handle next page
  const handleNext = () => {
    changePageNumber(currentPage +1)
  };

  return (
    <div>
      <h3
        className={`text-xl text-gray-500 pl-1 font-bold my-4 sticky top-[53px] z-[850] ${
          isScrolling && "bg-gray-500 text-white"
        } transition duration-200`}
      >
        {sectionName}
      </h3>
      <div
        className={`relative min-h-[200px] bg-primary-bg rounded-lg shadow-xl border border-action-text border-opacity-10 pb-14
        `}
      >
        {/* show tasks  */}
        {tasks?.length > 0 ? (
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
          ))
        ) : (
          <div className="w-[95%] mx-auto bg-white shadow-md rounded-lg px-2 py-[6px] mt-3">
            You don't have {sectionName} {setCurrentPage(1)} tasks!
          </div>
        )}

        {/* show pagination  */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => handlePrev()}
              disabled={currentPage === 1}
              className="mr-2 disabled:text-gray-400"
            >
              <MdKeyboardDoubleArrowLeft size={22} />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handleNext()}
              disabled={currentPage === totalPages}
              className="ml-2 disabled:text-gray-400"
            >
              <MdKeyboardDoubleArrowRight size={22} />
            </button>
          </div>
        )}

        {isCreateTask && (
          <div className="px-2 py-1  w-min whitespace-nowrap rounded-lg  font-bold absolute bottom-2 right-2">
            <span
              onClick={() => setIsAddIconClicked(true)}
              onMouseEnter={() => setIsMouseEntered(true)}
              onMouseLeave={() => setIsMouseEntered(false)}
              className="flex items-center gap-1 text-sm text-blue-600 cursor-pointer"
            >
              New Task
              <IoMdAddCircleOutline size={20} />
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
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  setTaskStatus: PropTypes.func,
  handlePageChange: PropTypes.func,
  taskStatus: PropTypes.string,
  totalTasks: PropTypes.number,
};

export default TaskCard;
