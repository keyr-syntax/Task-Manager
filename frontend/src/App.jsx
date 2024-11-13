import Createtask from "./Task Components/Createtask";
import Dashboard from "./Task Components/Dashboard";
import { Route, Routes } from "react-router-dom";
import EditTask from "./Task Components/EditTask";
import Tasklist from "./Task Components/Tasklist";
import Contextprovider from "./Task Components/Contextprovider";
import Seetask from "./Task Components/Seetask";
import Pendingtask from "./Task Components/Pendingtask";
import Completedtasks from "./Task Components/Completedtasks";
import Filterbypriority from "./Task Components/Filterbypriority";
import Taskreminder from "./Task Components/Taskreminder";
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
          <Route exact path="/seetask/:_id" element={<Seetask />} />
          <Route exact path="/edittask/:_id" element={<EditTask />} />
          <Route exact path="/pendingtasks" element={<Pendingtask />} />
          <Route exact path="/completedtasks" element={<Completedtasks />} />
          <Route
            exact
            path="/filterbypriority"
            element={<Filterbypriority />}
          />
          <Route exact path="/reminder" element={<Taskreminder />} />
        </Routes>
      </Contextprovider>
    </>
  );
}

export default App;
