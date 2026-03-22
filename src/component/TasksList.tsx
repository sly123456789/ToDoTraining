import tasksList from "../data/ExampleTasks.json";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Task } from "../types/tasks";

const columns: GridColDef<(typeof tasksList)[number]>[] = [
    { field: "title", headerName: "Title", flex: 1 },
    {
        field: "status",
        headerName: "Status",
        flex: 2,
    },
];

const tasks: Task[] = tasksList;

export default function TasksList() {
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
            getRowClassName={(params) =>
                `super-app-theme--${params.row.status.trim()}`
            }
        />
    );
}
