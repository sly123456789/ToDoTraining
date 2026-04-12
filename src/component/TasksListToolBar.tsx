import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    Toolbar,
    ToolbarButton,
    type ToolbarPropsOverrides,
} from "@mui/x-data-grid";
import * as React from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { type Task } from "../types/tasks";

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
    const [isStatusSelected, setIsStatusSelected] = React.useState<boolean>(false);
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
                status: status as Task["status"],
            };

            addTask(newTask);
            handleClose();
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Error when trying to submit new task";
            toast.error(errorMessage);
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
                        if (isStatusSelected) return;
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
                                    onOpen={() => setIsStatusSelected(true)}
                                    MenuProps={{
                                        TransitionProps: {
                                            onExited: () =>
                                                setIsStatusSelected(false),
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
