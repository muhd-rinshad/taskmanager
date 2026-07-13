import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-400">Task board</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">My tasks</h2>
        </div>
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
          {tasks.length} task{tasks.length === 1 ? "" : "s"} ready
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center text-slate-300">
          No tasks yet. Add one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;