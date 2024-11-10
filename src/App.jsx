import Createtask from "./Task Components/Createtask";
import Dashboard from "./Task Components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTask from "./Task Components/EditTask";
function App() {
  return (
    <>
      <BrowserRouter>
        {" "}
        <Dashboard />
        <Routes>
          <Route exact path="/createtask" element={<Createtask />} />
          <Route exact path="/updatetask/:_id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
