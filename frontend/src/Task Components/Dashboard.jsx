import { Link } from "react-router-dom";

import "./Dashboard.css";
function Dashboard() {
  return (
    <>
      <div className="navbar-container">
        <Link to="/alltasks">All Tasks</Link>
        <Link to="/createtask">Add New Task</Link>
        <Link to="/createtask">Pending Task</Link>
        <Link to="/createtask">Completed Task</Link>
      </div>
    </>
  );
}

export default Dashboard;
