// import io from "socket.io-client";

import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Taskreminder.css";

function Taskreminder() {
  const [reminderlist, setReminderlist] = useState([]);
  const {
    // fetchtaskonreminderlist,
    turnoffreminder,
    markaspending,
    markascompleted,
    deletetask,
    alltasks,
    getalltasks,
  } = useContext(TaskContext);

  useEffect(() => {
    getalltasks();
    const interval = setInterval(() => {
      getalltasks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // fetchtaskonreminderlist();
    filtertasksonreminderlist();
    const interval = setInterval(() => {
      // fetchtaskonreminderlist();
      filtertasksonreminderlist();
    }, 5000);

    return () => clearInterval(interval);
  }, [alltasks]);

  const filtertasksonreminderlist = () => {
    const tasksonreminderlist = alltasks.filter(
      (task) => task.addOnReminderlist === true && task.isNotified === true
    );
    setReminderlist(tasksonreminderlist);
  };

  return (
    <>
      {reminderlist && reminderlist.length > 0 ? (
        <>
          <p
            style={{
              margin: "65px 20px 30px 20px",
              textAlign: "center",
              border: "1px solid white",
              borderRadius: "6px",
              padding: "5px 5px",
            }}
          >
            Only Tasks on reminder List are listed here
          </p>
          {reminderlist.map(
            (task) =>
              task && (
                <>
                  <div key={task._id} className="taskreminder-container">
                    <h2>Task</h2>
                    <p>
                      Task: <span>{task.title}</span>{" "}
                    </p>

                    <p>
                      Reminder set for:{" "}
                      <span>
                        {new Date(task.reminder).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                    </p>
                    <div className="mobile-open-link-container">
                      <p>
                        <Link
                          to={`/seetask/${task._id}`}
                          className="task-management-button"
                        >
                          Open
                        </Link>
                      </p>
                      <p>
                        <Link
                          onClick={() => {
                            deletetask(task._id);
                          }}
                          className="task-management-button"
                        >
                          Delete
                        </Link>
                      </p>
                    </div>
                    <div className="mobile-open-link-container">
                      {task.addOnReminderlist === true && (
                        <p>
                          <Link
                            style={{ fontSize: "12px" }}
                            onClick={() => {
                              turnoffreminder(task._id);
                            }}
                            className="task-management-button"
                          >
                            Turnoff Reminder
                          </Link>
                        </p>
                      )}
                      {task.addOnReminderlist === false && (
                        <p>
                          <Link
                            to={`/edittask/${task._id}`}
                            onClick={() => {
                              turnoffreminder(task._id);
                            }}
                            className="task-management-button"
                          >
                            Add Reminder
                          </Link>
                        </p>
                      )}
                      {task.isPending === true && (
                        <p>
                          <Link
                            onClick={() => {
                              markascompleted(task._id);
                            }}
                            className="task-management-button"
                          >
                            Completed
                          </Link>
                        </p>
                      )}
                      {task.isPending === false && (
                        <p>
                          <Link
                            onClick={() => {
                              markaspending(task._id);
                            }}
                            className="task-management-button"
                          >
                            Pending
                          </Link>
                        </p>
                      )}
                    </div>
                    <div className="bottom-div"></div>
                  </div>
                </>
              )
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Taskreminder;
