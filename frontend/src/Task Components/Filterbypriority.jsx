import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Filterbypriority.css";

function Filterbypriority() {
  const {
    filteredtask,
    filtertask,
    getallpriorities,
    prioritylist,
    BASEAPI,
    getalltasks,
  } = useContext(TaskContext);
  useEffect(() => {
    getallpriorities();
    getalltasks();
  }, []);
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
          // navigate("/completedtasks");
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };

  return (
    <>
      {prioritylist && (
        <div
          style={{
            border: "1px solid white",
            margin: "60px auto 20px auto",
            width: "91vw",
            borderRadius: "4px",
            padding: "5px",
          }}
        >
          {prioritylist &&
            prioritylist.length > 0 &&
            prioritylist.map(
              (priority) =>
                priority &&
                priority.priorityname && (
                  <button
                    onClick={() => {
                      filtertask(priority.priorityname);
                    }}
                    key={priority._id}
                    style={{
                      backgroundColor: "#151533",
                      color: "white",
                      padding: "5px 8px",
                      border: "1px solid white",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "inline-block",
                      margin: "2px 5px",
                    }}
                  >
                    {priority.priorityname}
                  </button>
                )
            )}
        </div>
      )}
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
              {filteredtask.length <= 1 ? (
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
      {filteredtask && (
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
          {filteredtask.length <= 1 ? (
            <>You have {filteredtask.length} task</>
          ) : (
            <>You have {filteredtask.length} tasks</>
          )}
        </p>
      )}
      {filteredtask && filteredtask.length > 0 ? (
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
                    onClick={() => {
                      deletetask(task._id);
                    }}
                    className="mobile-open-link"
                  >
                    Delete
                  </Link>
                </p>
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
