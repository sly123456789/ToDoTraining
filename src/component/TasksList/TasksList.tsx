import "./TaskList.css";
import { selectTasksIds } from "../../features/tasks/tasksSlice";
import { useAppSelector } from "../../app/hooks";
import { TaskRow } from "../Task/Task";

export default function TasksList() {
  const tasksIds = useAppSelector((state) => selectTasksIds(state));

  return (
    <div className="task-list">
      {tasksIds.map((id) => (
        <TaskRow key={id} taskId={id} />
      ))}
    </div>
  );
}
