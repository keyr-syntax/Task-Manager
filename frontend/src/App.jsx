import Createtask from "./Task Components/Createtask";
import Dashboard from "./Task Components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTask from "./Task Components/EditTask";
import Tasklist from "./Task Components/Tasklist";
import Contextprovider from "./Task Components/Contextprovider";
function App() {
  return (
    <>
      <Contextprovider>
        {" "}
        <Dashboard />
        <Routes>
          <Route exact path="/createtask" element={<Createtask />} />
          <Route exact path="/updatetask/:_id" element={<EditTask />} />
          <Route exact path="/alltasks" element={<Tasklist />} />
        </Routes>
      </Contextprovider>
    </>
  );
}

export default App;
