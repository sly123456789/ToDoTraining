import "./TaskList.css";
import { selectAllTasks } from "../../features/tasks/tasksSlice";
import { useAppSelector } from "../../app/hooks";
import { TaskRow } from "../Task/Task";

export default function TasksList() {
  const tasks = useAppSelector((state) => selectAllTasks(state));

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </div>
  );
}
