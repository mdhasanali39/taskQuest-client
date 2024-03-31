import TaskCard from "../../components/TaskManagement/TaskCard/TaskCard";

const TaskManagement = () => {
  return (
    <div className="min-h-[86vh]">
      <div className="relative w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
        {/* todo lists  */}
        <TaskCard sectionName="Todo" isCreateTask={true} />
        {/* onGoing lists  */}
        <TaskCard sectionName="OnGoing" />
        {/* completed lists  */}
        <TaskCard sectionName="Completed" />
      </div>
    </div>
  );
};

export default TaskManagement;
