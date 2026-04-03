import * as React from "react";
import {
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { type ToolbarPropsOverrides } from "@mui/x-data-grid";
import { type Task } from "../types/tasks";
import { isStatus, defaultStatus } from "../types/statuses";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

declare module "@mui/x-data-grid" {
    interface ToolbarPropsOverrides {
        statusesOptions: string[];
        addTask: (task: Task) => void;
    }
}

export default function TasksListToolBar({
    statusesOptions,
    addTask,
}: ToolbarPropsOverrides) {
    const [newPanelOpen, setNewPanelOpen] = React.useState(false);
    const newPanelTriggerRef = React.useRef<HTMLButtonElement>(null);
    const [onSelectStatus, setOnSelectStatus] = React.useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = React.useState<string>(
        statusesOptions.length > 0 ? statusesOptions[0] : "",
    );

    const handleClose = () => {
        setNewPanelOpen(false);
    };

    const handleSubmit = (event: React.SubmitEvent) => {
        try {
            event.preventDefault();
            
            const { title, status } = Object.fromEntries(
                new FormData(event.target as HTMLFormElement),
            ) as { title: string; status: string };

            const newTask: Task = {
                id: uuid(),
                title,
                status: isStatus(status) ? status : defaultStatus,
            };

            addTask(newTask);
            handleClose();
        } catch {
            toast.error("Error when trying to submit new task");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
            handleClose();
        }
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setSelectedStatus(event.target.value as string);
    };

    return (
        <Toolbar>
            <Tooltip title="Add new task">
                <ToolbarButton
                    ref={newPanelTriggerRef}
                    aria-describedby="new-panel"
                    onClick={() => setNewPanelOpen((prev) => !prev)}>
                    <AddIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>

            <Popper
                open={newPanelOpen}
                anchorEl={newPanelTriggerRef.current}
                placement="bottom-end"
                id="new-panel"
                onKeyDown={handleKeyDown}>
                <ClickAwayListener
                    onClickAway={() => {
                        if (onSelectStatus) return;
                        handleClose();
                    }}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: 300,
                            p: 2,
                        }}
                        elevation={8}>
                        <Typography fontWeight="bold">Add new task</Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Task title"
                                    name="title"
                                    size="small"
                                    autoFocus
                                    fullWidth
                                    required
                                />
                                <Select
                                    value={selectedStatus}
                                    label="Status"
                                    name="status"
                                    onOpen={() => setOnSelectStatus(true)}
                                    MenuProps={{
                                        TransitionProps: {
                                            onExited: () =>
                                                setOnSelectStatus(false),
                                        },
                                    }}
                                    onChange={handleStatusChange}>
                                    {statusesOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth>
                                    Add task
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </ClickAwayListener>
            </Popper>

            <Tooltip title="Columns">
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
            </Tooltip>

            <Tooltip title="Filters">
                <FilterPanelTrigger
                    render={(props, state) => (
                        <ToolbarButton {...props} color="default">
                            <Badge
                                badgeContent={state.filterCount}
                                color="primary"
                                variant="dot">
                                <FilterListIcon fontSize="small" />
                            </Badge>
                        </ToolbarButton>
                    )}
                />
            </Tooltip>
        </Toolbar>
    );
}
