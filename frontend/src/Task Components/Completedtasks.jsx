import "./Tasklist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";

function Completedtasks() {
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
  const [completedtasks, setCompletedtasks] = useState([]);

  useEffect(() => {
    getalltasks();
  }, []);

  useEffect(() => {
    const filtercompletedtasks = () => {
      setIsLoading(true);
      const completedtasks = alltasks.filter(
        (task) => task.isPending === false
      );
      setIsLoading(false);
      return setCompletedtasks(completedtasks);
    };
    filtercompletedtasks();
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
        <div className="table-container">
          {completedtasks && completedtasks.length > 0 ? (
            <>
              {/* <div className="table-heading">Completed tasks</div> */}
              <p
                style={{
                  margin: "70px auto 20px auto",
                  textAlign: "center",
                  border: "1px solid white",
                  borderRadius: "4px",
                  width: "82%",
                  padding: "5px 10px",
                  fontSize: "18px",
                }}
              >
                You have completed {completedtasks.length} tasks
              </p>
              <table>
                <thead>
                  <tr className="table-head">
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>See Task</th>
                  </tr>
                </thead>
                <tbody>
                  {completedtasks &&
                    completedtasks.map(
                      (task) =>
                        task && (
                          <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>
                              {new Date(task.scheduledFor).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                }
                              )}
                            </td>

                            {!task.isPending && (
                              <td
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                Completed
                              </td>
                            )}
                            <td>{task.priority}</td>
                            <td className="delete-tr">
                              <Link
                                to={`/seetask/${task._id}`}
                                className="delete-link"
                              >
                                Open
                              </Link>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            </>
          ) : (
            <div className="table-heading">No Completed tasks</div>
          )}
        </div>
      )}
      {!isLoading && (
        <p
          className="counter"
          style={{
            margin: "70px auto 20px auto",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "4px",
            width: "86%",
            padding: "5px 10px",
            fontSize: "16px",
          }}
        >
          You have completed {completedtasks.length} tasks
        </p>
      )}
      {!isLoading && completedtasks && completedtasks.length > 0 ? (
        completedtasks.map(
          (task) =>
            task && (
              <div key={task._id} className="mobile-container">
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
            )
        )
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Completedtasks;
