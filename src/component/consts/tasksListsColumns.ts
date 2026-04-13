import type { GridColDef } from "@mui/x-data-grid";
import type { Task } from "../../types/tasks";
import { statusesList } from "../../types/statuses";

export const columns: GridColDef<Task>[] = [
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