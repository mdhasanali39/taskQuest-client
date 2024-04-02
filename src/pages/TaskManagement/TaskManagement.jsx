import { getTasks } from "../../api/crud";
import TaskCard from "../../components/TaskManagement/TaskCard/TaskCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Grid } from "react-loader-spinner";
import { useState } from "react";

const TaskManagement = () => {
  const [currentPageTodo, setCurrentPageTodo] = useState(1);
  const [currentPageOngoing, setCurrentPageOngoing] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  // const [currentPage,setCurrentPage] = useState(1)
  const [taskStatus, setTaskStatus] = useState("all");
  const pageSize = 3;
  const { user,isLoading } = useAuth();

  // console.log(taskStatus);

  const {
    data: todoTasks = [],
    refetch: refetchTodo,
    isLoading: isTodoLoading,
  } = useQuery({
    enabled: !isLoading && !!user?.email,
    queryKey: ["tasks", currentPageTodo,user?.email, taskStatus],
    queryFn: async () => {
      const data = await getTasks(user?.email, currentPageTodo, pageSize, taskStatus);
      return data;
    },
  });
  const {
    data: ongoingTasks = [],
    refetch: refetchOngoing,
    isLoading: isOngoingLoading,
  } = useQuery({
    queryKey: ["tasks", currentPageOngoing,user?.email, taskStatus],
    queryFn: async () => {
      const data = await getTasks(
        user?.email,
        currentPageOngoing,
        pageSize,
        taskStatus
      );
      return data;
    },
  });
  const {
    data: completedTasks = [],
    refetch: refetchCompleted,
    isLoading: isCompletedLoading,
  } = useQuery({
    queryKey: ["tasks", currentPageCompleted,user?.email, taskStatus],
    queryFn: async () => {
      const data = await getTasks(
        user?.email,
        currentPageCompleted,
        pageSize,
        taskStatus
      );
      return data;
    },
  });

  return (
    <div className="min-h-[86vh]">
      {isTodoLoading || isOngoingLoading || isCompletedLoading ? (
        <div className="min-h-[86vh] flex justify-center items-center">
          <span className="">
            {" "}
            <Grid
              visible={true}
              height="80"
              width="80"
              color="#3b82f6"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
          </span>
        </div>
      ) : (
        <div className="relative w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
          {/* todo lists  */}
          <TaskCard
            sectionName="Todo"
            isCreateTask={true}
            tasks={todoTasks?.todo}
            totalTasks={todoTasks?.totalTodoTasks}
            refetch={refetchTodo}
            pageSize={pageSize}
            currentPage={currentPageTodo}
            setCurrentPage={setCurrentPageTodo}
            taskStatus="todo"
            setTaskStatus={setTaskStatus}
          />
          {/* onGoing lists  */}
          <TaskCard
            sectionName="OnGoing"
            tasks={ongoingTasks?.ongoing}
            totalTasks={ongoingTasks?.totalOngoingTasks}
            refetch={refetchOngoing}
            pageSize={pageSize}
            currentPage={currentPageOngoing}
            setCurrentPage={setCurrentPageOngoing}
            taskStatus="ongoing"
            setTaskStatus={setTaskStatus}
          />
          {/* completed lists  */}
          <TaskCard
            sectionName="Completed"
            tasks={completedTasks?.completed}
            totalTasks={completedTasks?.totalCompletedTasks}
            refetch={refetchCompleted}
            pageSize={pageSize}
            currentPage={currentPageCompleted}
            setCurrentPage={setCurrentPageCompleted}
            taskStatus="completed"
            setTaskStatus={setTaskStatus}
          />
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
