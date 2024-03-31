const Task = () => {
    return (
        <div className={`relative w-[95%] mx-auto bg-white shadow-md rounded-lg px-2 py-[6px] mt-3 cursor-grab`}>
      <h3 className="font-semibold text-gray-600">taskName</h3>
      <p className="text-sm">taskDescription</p>
      <p className="text-sm font-bold px-2 py-1 bg-action-bg text-white rounded-lg w-min whitespace-nowrap mt-2">
        priority
      </p>
      
    </div>
    );
};

export default Task;