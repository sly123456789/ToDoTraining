import { selectTasksIds } from "../features/tasks/tasksSlice";
import { useAppSelector } from "../app/hooks";
import { TaskRow } from "./Task";
import { Box } from "@mui/material";

export default function TasksList() {
  const tasksIds = useAppSelector((state) => selectTasksIds(state));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {tasksIds.map((id) => (
        <TaskRow key={id} taskId={id} />
      ))}
    </Box>
  );
}
