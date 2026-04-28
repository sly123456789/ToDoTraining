import "./AddTask.css";
import { useState } from "react";
import { statusesList, type Statuses } from "../../types/statuses";
import type { Task } from "../../types/tasks";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "../../features/tasks/tasksSlice";
import StatusDropdown from "../StatusDropdown";
import { toast } from "react-toastify";

export default function AddTask() {
  const [selectedStatus, setSelectedStatus] = useState<Statuses>(
    statusesList.length > 0 ? statusesList[0] : "",
  );
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleAddTask() {
    if (!newTaskTitle.trim()) {
      toast.error("Task title is empthy");
      return;
    }

    const newTask: Task = {
      id: uuid(),
      title: newTaskTitle,
      status: selectedStatus,
    };

    try {
      dispatch(addTask(newTask));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error when trying to submit new task";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="add-task">
      <input
        className="add-task-input"
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter task title..."
      />
      <StatusDropdown />
      <button className="add-task-button" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}
