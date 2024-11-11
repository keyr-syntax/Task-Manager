import { Link } from "react-router-dom";

import "./Dashboard.css";
function Dashboard() {
  return (
    <>
      <div className="navbar-container">
        <Link to="/alltasks">All Tasks</Link>

        <Link to="/pendingtasks">Pending Task</Link>
        <Link to="/completedtasks">Completed Task</Link>
        <Link to="/createtask">Add New Task</Link>
      </div>
    </>
  );
}

export default Dashboard;
