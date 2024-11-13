// import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Taskreminder.css";

function Taskreminder() {
  const { fetchtaskonreminderlist, reminderlist, turnoffreminder } =
    useContext(TaskContext);

  useEffect(() => {
    fetchtaskonreminderlist();
    const interval = setInterval(() => {
      fetchtaskonreminderlist();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {reminderlist && reminderlist.length > 0 ? (
        <>
          {reminderlist.map(
            (task) =>
              task && (
                <>
                  <div key={task._id} className="seetask-container">
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
                    <p>
                      <Link
                        to={`/seetask/${task._id}`}
                        className="mobile-open-link"
                      >
                        Open
                      </Link>
                    </p>
                    <p>
                      <Link
                        to={`/edittask/${task._id}`}
                        className="mobile-open-link"
                      >
                        Add new reminder
                      </Link>
                    </p>
                    <p>
                      <Link
                        onClick={() => {
                          turnoffreminder(task._id);
                        }}
                        className="mobile-open-link"
                      >
                        Turnoff reminder
                      </Link>
                    </p>
                    <div className="bottom-div"></div>
                  </div>
                </>
              )
          )}
        </>
      ) : (
        <div></div>
      )}
      <ToastContainer />
    </>
  );
}

export default Taskreminder;
