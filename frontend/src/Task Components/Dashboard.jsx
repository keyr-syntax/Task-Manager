import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

import "./Dashboard.css";
import { useEffect, useRef, useState } from "react";
function Dashboard() {
  const [menuopen, setMenuopen] = useState(false);
  const menuref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuref.current && !menuref.current.contains(event.target)) {
        setMenuopen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="navbar-container">
        <Link to="/alltasks">All Tasks</Link>
        <Link to="/pendingtasks">Pending Task</Link>
        <Link to="/completedtasks">Completed Task</Link>
        <Link to="/createtask">New Task</Link>
        <Link to="/filterbypriority/:level">Filter by Priority </Link>
        <Link to="/createpriority">Create priority</Link>
        <Link to="/prioritylist">Priority List</Link>
        <Link to="/reminder">Reminder</Link>
        <Link to="/tasksfortoday">Todays task</Link>
        <Link to="/filterbydate/:date">Find tasks by date</Link>
      </div>
      <div className="mobile-navbar-container">
        <Link to="/alltasks">Home</Link>

        {!menuopen ? (
          <Menu
            onClick={() => {
              setMenuopen(!menuopen);
            }}
            size={35}
            style={{
              float: "right",
              margin: "10px 20px 5px auto",
              right: 0,
              position: "absolute",
            }}
            className="menu-icon"
          />
        ) : (
          <X
            onClick={() => {
              setMenuopen(!menuopen);
            }}
            size={35}
            style={{
              float: "right",
              margin: "10px 20px 5px auto",
              right: 0,
              position: "absolute",
            }}
          />
        )}

        <Link className="mobile-navbar-container-link" to="/alltasks">
          All{" "}
        </Link>
        <Link className="mobile-navbar-container-link" to="/pendingtasks">
          Pending{" "}
        </Link>
        <Link className="mobile-navbar-container-link" to="/completedtasks">
          Completed{" "}
        </Link>
        <Link className="mobile-navbar-container-link" to="/createtask">
          New{" "}
        </Link>
        <Link className="mobile-navbar-container-link" to="/filterbypriority">
          Priority{" "}
        </Link>
      </div>
      {menuopen && (
        <div ref={menuref} className="mobile-side-navbar">
          <Link to="/alltasks">All tasks</Link>
          <Link to="/pendingtasks">Pending tasks</Link>
          <Link to="/completedtasks">Completed tasks </Link>
          <Link to="/createtask">Add new task</Link>
          <Link to="/filterbypriority/:level">Filter by Priority </Link>
          <Link to="/createpriority">Create priority</Link>
          <Link to="/prioritylist">Priority List</Link>
          <Link to="/reminder">Reminder</Link>
          <Link to="/tasksfortoday">Todays task</Link>
          <Link to="/filterbydate/:date">Find tasks by date</Link>
        </div>
      )}
    </>
  );
}

export default Dashboard;
