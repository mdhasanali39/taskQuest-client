import { getTasks } from "../../api/crud";
import TaskCard from "../../components/TaskManagement/TaskCard/TaskCard";
import {useQuery} from '@tanstack/react-query'
import useAuth from "../../hooks/useAuth";

const TaskManagement = () => {
  const {user} = useAuth()

  const {data:tasks = [],refetch} = useQuery({
    queryKey:["tasks",],
    queryFn: async()=>{
      const data = await getTasks(user)
      return data;
    }
  })

  return (
    <div className="min-h-[86vh]">
      <div className="relative w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
        {/* todo lists  */}
        <TaskCard sectionName="Todo" isCreateTask={true} tasks={tasks?.todo} refetch={refetch} />
        {/* onGoing lists  */}
        <TaskCard sectionName="OnGoing" tasks={tasks?.ongoing} />
        {/* completed lists  */}
        <TaskCard sectionName="Completed" tasks={tasks?.completed} />
      </div>
    </div>
  );
};

export default TaskManagement;
