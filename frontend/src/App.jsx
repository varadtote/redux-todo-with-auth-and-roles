import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Todo from "./screens/Todo";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import Admin from "./screens/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <div className="h-[100vh] w-[100vw]">
        <Navbar />
    
        <Routes>
          <Route index={true} path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}
