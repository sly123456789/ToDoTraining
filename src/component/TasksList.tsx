import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import type { Task } from "../types/tasks";
import TasksListToolBar from "./TasksListToolBar";
import { columns } from "./consts/TasksListsColumns";
import { useDispatch } from "react-redux";
import { addTask, selectAllTasks, updateTask } from "../features/tasks/tasksSlice";
import { useAppSelector, type AppDispatch } from "../app/store";

export default function TasksList() {
  const tasks = useAppSelector(state => selectAllTasks(state));
  const dispatch: AppDispatch = useDispatch();

  function handleAddTask(newTask: Task) {
    if (tasks.some((task: Task) => newTask.title === task.title)) {
      toast.warning("Task with this title already exists");
    } else {
      dispatch(addTask(newTask));
    }
  }

  function handleRowUpdate(updatedTask: Task) {
    dispatch(updateTask({id: updatedTask.id, changes: updatedTask}));
    return updatedTask;
  }

  return (
    <DataGrid
      rows={tasks}
      columns={columns}
      processRowUpdate={handleRowUpdate}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
      slots={{ toolbar: TasksListToolBar }}
      slotProps={{
        toolbar: {
          addTask: handleAddTask,
        },
      }}
      showToolbar
      getRowClassName={(params) =>
        `super-app-theme--${params.row.status.trim()}`
      }
      sx={{
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .super-app-theme--Done": {
          backgroundColor: "#2ad95e",
        },
        "& .super-app-theme--In.progress": {
          backgroundColor: "#d9cd2a",
        },
        "& .super-app-theme--To.do": {
          backgroundColor: "#2ab6d9",
        },
      }}
    />
  );
}
