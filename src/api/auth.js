import axiosSecure from ".";

// access Token
export const accessToken = async(email) =>{
    const {data} = await axiosSecure.post("/task-quest/access-token",{email})
    console.log('token gotten from server', data);
    return data;
}
// clear token 
export const clearCookie = async() =>{
    const {data} = await axiosSecure.get("/task-quest/delete-token")
    return data;
}