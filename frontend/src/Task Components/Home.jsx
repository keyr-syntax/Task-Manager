import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
function Home() {
  const [openTask, setOpenTask] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);

  return (
    <>
      <div className="menu-options">
        <Link
          onClick={() => {
            setOpenTask(!openTask);
          }}
          className="menu-options-link"
        >
          Task
        </Link>
        {openTask && (
          <div className="submenu-container">
            <Link to="/alltasks">All tasks</Link>
            <Link to="/pendingtasks">Pending tasks</Link>
            <Link to="/completedtasks">Completed tasks </Link>
          </div>
        )}
        <Link
          onClick={() => {
            setOpenFilter(!openFilter);
          }}
          className="menu-options-link"
        >
          Filter Tasks
        </Link>
        {openFilter && (
          <div className="submenu-container">
            <Link to="/filterbypriority/:level">Filter by Priority </Link>
            <Link to="/filterbydate/:date">Find tasks by date</Link>
          </div>
        )}
        <Link to="/reminder" className="menu-options-link">
          Reminder
        </Link>
        <Link to="/repeat" className="menu-options-link">
          Repeat
        </Link>
        <Link to="/tasksfortoday" className="menu-options-link">
          Today Tasks
        </Link>
        <Link to="/createtask" className="menu-options-link">
          new task
        </Link>
        <Link
          onClick={() => {
            setOpenPriority(!openPriority);
          }}
          className="menu-options-link"
        >
          Priority
        </Link>
        {openPriority && (
          <div className="submenu-container">
            <Link to="/createpriority">Create priority</Link>
            <Link to="/prioritylist">Priority List</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
