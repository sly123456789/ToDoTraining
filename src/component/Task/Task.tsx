import "./Task.css";
import { memo } from "react";
import type { Task } from "../../types/tasks";
import { statusesList } from "../../types/statuses";
import { useAppDispatch } from "../../app/hooks";
import { updateTask } from "../../features/tasks/tasksSlice";
import { toast } from "react-toastify";

export const TaskRow = memo(({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();

  function updateStatus(id: string, newStatus: string) {
    const newTask = {
      id: id,
      status: newStatus,
    };

    try {
      dispatch(updateTask({ id: id, changes: newTask }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error when trying to submit new task";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="task">
      <span>{task.title}</span>
      <select
        value={task.status}
        onChange={(e) => updateStatus(task.id, e.target.value)}
      >
        {statusesList.map((status) => (
          <option id={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
});
