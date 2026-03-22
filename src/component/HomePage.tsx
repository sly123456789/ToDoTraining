import "./HomePage.css";
import TasksList from "./TasksList";

export default function HomePage() {
    return (
        <>
            <h1 className="title">To Do List</h1>
            <TasksList />
        </>
    );
}
