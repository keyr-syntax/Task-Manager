import { Link } from "react-router-dom";

import "./Dashboard.css";
function Dashboard() {
  return (
    <>
      <div className="navbar-container">
        <Link to="/alltasks">All Tasks</Link>
        <Link to="/createtask">New Task</Link>
      </div>
    </>
  );
}

export default Dashboard;
