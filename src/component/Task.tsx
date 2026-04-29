import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectTaskById, updateTask } from "../features/tasks/tasksSlice";
import { toast } from "react-toastify";
import { Box, Typography, type SelectChangeEvent } from "@mui/material";
import StatusDropdown from "./StatusDropdown";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderBottom: "1px solid #eee",
      }}
    >
      <Typography sx={{margin: "auto"}} variant="body1">{task.title}</Typography>{" "}
      <StatusDropdown current={task.status} onChange={updateStatus} />
    </Box>
  );
});
