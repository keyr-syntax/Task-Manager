import "./Tasklist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
function Tasklist() {
  const { alltasks, getalltasks } = useContext(TaskContext);
  useEffect(() => {
    getalltasks();
  }, []);

  return (
    <>
      <div className="table-container">
        {alltasks && alltasks.length > 0 ? (
          <>
            <div className="table-heading">All tasks</div>
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
                {alltasks &&
                  alltasks.map(
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
                          {task.isPending ? (
                            <td style={{ color: "red" }}>Pending</td>
                          ) : (
                            <td style={{ color: "green" }}>Completed</td>
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
      {alltasks && alltasks.length > 0 ? (
        alltasks.map(
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
                <p>
                  <Link
                    to={`/seetask/${task._id}`}
                    className="mobile-open-link"
                  >
                    Open
                  </Link>
                </p>
                <div className="mobile-bottom-div"></div>
              </div>
            )
        )
      ) : (
        <div>No Task</div>
      )}
    </>
  );
}

export default Tasklist;
