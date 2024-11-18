import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RepeatTaskList.css";
function RepeatTaskList() {
  const [repeatlist, setRepeatlist] = useState([]);
  const {
    turnoffrepeat,
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
    filtertasksonrepeatlist();
    const interval = setInterval(() => {
      filtertasksonrepeatlist();
    }, 5000);

    return () => clearInterval(interval);
  }, [alltasks]);

  const filtertasksonrepeatlist = () => {
    const tasksonrepeatlist = alltasks.filter(
      (task) => task.addOnRepeatlist === true
    );
    setRepeatlist(tasksonrepeatlist);
  };
  return (
    <>
      {repeatlist && repeatlist.length > 0 ? (
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
            Only Tasks on repeat List are listed here
          </p>
          {repeatlist.map(
            (task) =>
              task && (
                <>
                  <div key={task._id} className="taskrepeat-container">
                    <h2>Task</h2>
                    <p>
                      Task: <span>{task.title}</span>{" "}
                    </p>

                    <p>
                      Repeat Date:{" "}
                      <span>
                        {new Date(task.repeatDate).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                    </p>
                    <p>
                      Repeat Interval: <span>{task.repeatInterval}</span>
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
                      {task.addOnRepeatlist === true && (
                        <p>
                          <Link
                            style={{ fontSize: "12px" }}
                            onClick={() => {
                              turnoffrepeat(task._id);
                            }}
                            className="task-management-button"
                          >
                            Turnoff Repeat
                          </Link>
                        </p>
                      )}
                      {task.addOnRepeatlist === false && (
                        <p>
                          <Link
                            to={`/edittask/${task._id}`}
                            className="task-management-button"
                          >
                            Add Repeat
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

export default RepeatTaskList;
