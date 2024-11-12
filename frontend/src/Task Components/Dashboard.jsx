import { Link } from "react-router-dom";

import "./Dashboard.css";
function Dashboard() {
  return (
    <>
      <div className="navbar-container">
        <Link to="/alltasks">All Tasks</Link>
        <Link to="/pendingtasks">Pending Task</Link>
        <Link to="/completedtasks">Completed Task</Link>
        <Link to="/createtask">New Task</Link>
        <Link to="/filterbypriority">Priority</Link>
      </div>
      <div className="mobile-navbar-container">
        <Link to="/alltasks">All </Link>
        <Link to="/pendingtasks">Pending </Link>
        <Link to="/completedtasks">Completed </Link>
        <Link to="/createtask">New </Link>
        <Link to="/filterbypriority">Priority </Link>
      </div>
    </>
  );
}

export default Dashboard;
