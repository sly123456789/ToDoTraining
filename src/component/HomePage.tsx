import { Box } from "@mui/material";
import "./HomePage.css";
import TasksList from "../features/tasks/TasksList";

export default function HomePage() {
  return (
    <Box>
      <h1 className="title">To Do List</h1>
      <TasksList />
    </Box>
  );
}
