import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="col-span-2">
      <h2 className="text-4xl font-bold text-slate-100 text-center mb-8">
        My Tasks
      </h2>

     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;