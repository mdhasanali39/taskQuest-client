import axios from 'axios'

// create/save task on database 
export const createTask = async(taskInfo) => {
    const {data} = await axios.post("http://localhost:5000/task-quest/create-task",taskInfo);
    return data; 
}
// update task
export const updateTask = async(id,updateTaskInfo) => {
    const {data} = await axios.put(`http://localhost:5000/task-quest/update-task/${id}`,updateTaskInfo);
    return data; 
}
// get tasks - user specific
export const getTasks = async(user) => {
    const {data} = await axios.get(`http://localhost:5000/task-quest/get-all/${user?.email}`);
    return data?.tasks; 
}