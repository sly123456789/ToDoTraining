import * as React from "react";
import { tasks as initialTasks } from "../data/TasksStorage";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Task } from "../types/tasks";
import TasksListToolBar from "./TasksListToolBar";
import { statusesList } from "../types/statuses";
import { toast } from "react-toastify";

const columns: GridColDef<Task>[] = [
    { field: "title", headerName: "Title", flex: 1 },
    {
        field: "status",
        headerName: "Status",
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: statusesList,
    },
];

export default function TasksList() {
    const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

    const addTask = (newTask: Task) => {
        tasks.some((task) => newTask.title === task.title)
            ? toast.warning("Task with this title already exists")
            : setTasks((prev) => [...prev, newTask]);
    };

    function handleRowUpdate(newRow: Task) {
        const updatedTasks = tasks.map((task) =>
            task.id === newRow.id ? newRow : task,
        );

        setTasks(updatedTasks);
        return newRow;
    }

    return (
        <>
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
                        statusesOptions: statusesList,
                        addTask: addTask,
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
        </>
    );
}
