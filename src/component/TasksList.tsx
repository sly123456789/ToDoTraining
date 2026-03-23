import * as React from "react";
import initialTasks from "../data/ExampleTasks.json";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Task } from "../types/tasks";
import CustomToolbar from "./CustomToolbar";

const statuses: string[] = ["Not started", "In progress", "Done"];

const columns: GridColDef<(typeof initialTasks)[number]>[] = [
    { field: "title", headerName: "Title", flex: 1 },
    {
        field: "status",
        headerName: "Status",
        flex: 2,
        editable: true,
        type: "singleSelect",
        valueOptions: statuses,
    },
];

export default function TasksList() {
    const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

    const AddTask = (task: Task) => {
        setTasks((prev) => [...prev, task]);
    };

    return (
        <DataGrid
            rows={tasks}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
            slotProps={{
                toolbar: {
                    statuses: statuses,
                    addTask: AddTask,
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
                "& .super-app-theme--Not.started": {
                    backgroundColor: "#2ab6d9",
                },
            }}
        />
    );
}
