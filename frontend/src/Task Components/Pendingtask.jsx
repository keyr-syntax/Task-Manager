import "./Tasklist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";

function Pendingtask() {
  const {
    alltasks,
    getalltasks,
    BASEAPI,
    turnoffreminder,
    markaspending,
    markascompleted,
    isLoading,
    setIsLoading,
  } = useContext(TaskContext);
  const [pendingtask, setPendingtask] = useState([]);
  useEffect(() => {
    getalltasks();
  }, []);
  useEffect(() => {
    const filterpendingtask = () => {
      setIsLoading(true);
      const filterpending = alltasks.filter((task) => task.isPending === true);
      setIsLoading(false);
      return setPendingtask(filterpending);
    };
    filterpendingtask();
  }, [alltasks]);
  const deletetask = async (_id) => {
    if (window.confirm("Confirm Delete")) {
      try {
        const data = await fetch(`${BASEAPI}/api/task/deletetask/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        if (response.success) {
          getalltasks();
          toast.success("Task Deleted successfully");
          // navigate("/completedtasks");
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <p
          style={{
            margin: "70px auto 30px auto",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "4px",
            width: "86%",
            padding: "5px 10px",
            fontSize: "16px",
          }}
        >
          You have {pendingtask.length} pending tasks
        </p>
      )}
      {!isLoading && pendingtask && pendingtask.length > 0 ? (
        pendingtask.map(
          (task, index) =>
            task && (
              <>
                <div key={index} className="mobile-container-div">
                  <h2>Task</h2>
                  <p>
                    Task: <span>{task.title}</span>{" "}
                  </p>

                  <p>
                    Status:{" "}
                    {task.isPending ? (
                      <span style={{ color: "red" }}>Pending</span>
                    ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Completed
                      </span>
                    )}
                  </p>

                  <p>
                    Due date:{" "}
                    <span>
                      {new Date(task.scheduledFor).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                  </p>
                  {task.addOnReminderlist === true && (
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
                  )}
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

                  <div className="mobile-bottom-div"></div>
                </div>
              </>
            )
        )
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Pendingtask;
