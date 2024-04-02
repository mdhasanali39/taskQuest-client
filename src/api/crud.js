import axiosSecure from ".";

// create/save task on database 
export const createTask = async(taskInfo) => {
    const {data} = await axiosSecure.post("http://localhost:5000/task-quest/create-task",taskInfo);
    return data; 
}
// get tasks - user specific
export const getTasks = async(email,currentPage,pageSize,taskStatus) => {
    const {data} = await axiosSecure.get(`http://localhost:5000/task-quest/get-all/${email}?currentPage=${currentPage}&pageSize=${pageSize}&taskStatus=${taskStatus}`);
    return data?.tasks; 
}
// update task
export const updateTask = async(id,updateTaskInfo) => {
    const {data} = await axiosSecure.put(`http://localhost:5000/task-quest/update-task/${id}`,updateTaskInfo);
    return data; 
}
// update task status to ongoing
export const updateTaskStatus = async(id,updateStatus) => {
    const {data} = await axiosSecure.patch(`http://localhost:5000/task-quest/update-task-status/${id}`,updateStatus);
    return data; 
}
// update task status to ongoing
export const deleteTask = async(id) => {
    const {data} = await axiosSecure.delete(`http://localhost:5000/task-quest/delete-task/${id}`);
    return data; 
}