//importing all components
import AllTasks from "./Components/AllTasks";
import AddTask from "./Components/AddTask";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ViewTask from "./Components/ViewTask";
import UpdateTask from "./Components/UpdateTask";
//routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllTasks />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/add" element={<AddTask />}></Route>
          <Route path="/view/:id" element={<ViewTask />}></Route>
          <Route path="/update/:id" element={<UpdateTask />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
