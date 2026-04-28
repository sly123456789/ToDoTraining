import { ToastContainer } from "react-toastify";
import "./App.css";
import HomePage from "./component/HomePage/HomePage";

function App() {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <HomePage />
    </>
  );
}

export default App;
