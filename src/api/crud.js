import axios from 'axios'

// create/save task on database 
export const createTask = async(taskInfo) => {
    const {data} = await axios.post("http://localhost:5000/task-quest/create-task",taskInfo);
    return data; 
}
// get tasks - user specific
export const getTasks = async(user) => {
    const {data} = await axios.get(`http://localhost:5000/task-quest/get-all/${user?.email}`);
    return data?.tasks; 
}
// update task
export const updateTask = async(id,updateTaskInfo) => {
    const {data} = await axios.put(`http://localhost:5000/task-quest/update-task/${id}`,updateTaskInfo);
    return data; 
}
// update task status to ongoing
export const updateTaskStatus = async(id,updateStatus) => {
    const {data} = await axios.patch(`http://localhost:5000/task-quest/update-task-status/${id}`,updateStatus);
    return data; 
}
// update task status to ongoing
export const deleteTask = async(id) => {
    const {data} = await axios.delete(`http://localhost:5000/task-quest/delete-task/${id}`);
    return data; 
}