import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Filterbypriority.css";
import Listofpriorityforfilter from "./Listofpriorityforfilter.jsx";

function Filterbypriority() {
  const [filteredtask, setFilteredtask] = useState([]);
  const { level } = useParams();
  const {
    getallpriorities,
    BASEAPI,
    getalltasks,
    turnoffreminder,
    markaspending,
    markascompleted,
    alltasks,
    isLoading,
    setIsLoading,
  } = useContext(TaskContext);
  useEffect(() => {
    getallpriorities();
    getalltasks();
  }, []);

  useEffect(() => {
    const filtertask = (level) => {
      setIsLoading(true);
      const filtered = alltasks.filter(
        (task) => task.isPending === true && task.priority === level
      );
      setIsLoading(false);
      return setFilteredtask(filtered);
    };
    filtertask(level);
  }, [level, alltasks]);

  const deletetask = async (_id) => {
    if (window.confirm("Confirm Delete")) {
      setIsLoading(true);
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
          setIsLoading(false);
          // navigate("/completedtasks");
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };

  return (
    <>
      <Listofpriorityforfilter />
      {!isLoading && (
        <div className="table-container">
          {filteredtask && filteredtask.length > 0 ? (
            <>
              <p
                style={{
                  margin: "20px auto 20px auto",
                  textAlign: "center",
                  border: "1px solid white",
                  borderRadius: "4px",
                  width: "82%",
                  padding: "5px 10px",
                  fontSize: "18px",
                }}
              >
                {filteredtask.length == 1 ? (
                  <>You have {filteredtask.length} task</>
                ) : (
                  <>You have {filteredtask.length} tasks</>
                )}
              </p>

              <table>
                <thead>
                  <tr className="table-head">
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>See Task</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredtask &&
                    filteredtask.map(
                      (task) =>
                        task &&
                        task.isPending === true && (
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
                            {task.isPending && (
                              <td style={{ color: "red" }}>Pending</td>
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
            <div className="table-heading">No tasks</div>
          )}
        </div>
      )}
      {!isLoading && filteredtask && (
        <p
          className="counter"
          style={{
            margin: "20px auto 20px auto",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "4px",
            width: "86%",
            padding: "5px 10px",
            fontSize: "16px",
          }}
        >
          {filteredtask.length == 1 ? (
            <>You have {filteredtask.length} task</>
          ) : (
            <>You have {filteredtask.length} tasks</>
          )}
        </p>
      )}
      {!isLoading && filteredtask && filteredtask.length >= 1 ? (
        filteredtask.map(
          (task) =>
            task &&
            task.isPending === true && (
              <div key={task._id} className="mobile-container">
                <h2>Task</h2>
                <p>
                  Task: <span>{task.title}</span>{" "}
                </p>

                <p>
                  Status:{" "}
                  {task.isPending === true && (
                    <span style={{ color: "red" }}>Pending</span>
                  )}
                </p>
                <p>
                  Priority:
                  <span>{task.priority}</span>
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

export default Filterbypriority;
