import { Box } from "@mui/material";
import "./HomePage.css";
import TasksList from "../TasksList";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import AddTask from "../AddTask";

export default function HomePage() {
  return (
    <Box>
      <Provider store={store}>
        <h1 className="title">To Do List</h1>
        <AddTask />
        <TasksList />
      </Provider>
    </Box>
  );
}
