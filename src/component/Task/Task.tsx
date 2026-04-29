import "./Task.css";
import { memo } from "react";
import { statusesList } from "../../types/statuses";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTaskById, updateTask } from "../../features/tasks/tasksSlice";
import { toast } from "react-toastify";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

export const TaskRow = memo(({ taskId }: { taskId: string }) => {
  const task = useAppSelector((state) => selectTaskById(state, taskId));
  const dispatch = useAppDispatch();

  function updateStatus(event: SelectChangeEvent) {
      const newTask = {
      id: taskId,
      status: event.target.value,
    };

    try {
      dispatch(updateTask({ id: taskId, changes: newTask }));
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
      {task.title}
      <Select
        value={task.status}
        onChange={updateStatus}
      >
        {statusesList.map((status) => (
          <MenuItem id={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
});
