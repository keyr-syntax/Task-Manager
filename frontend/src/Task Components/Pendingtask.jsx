import "./Tasklist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Pendingtask() {
  const { alltasks, getalltasks } = useContext(TaskContext);
  const [pendingtask, setPendingtask] = useState([]);
  useEffect(() => {
    getalltasks();
  }, []);
  useEffect(() => {
    const filterpendingtask = () => {
      const filterpending = alltasks.filter((task) => task.isPending === true);
      return setPendingtask(filterpending);
    };
    filterpendingtask();
  }, [alltasks]);

  return (
    <>
      <div className="table-container">
        {pendingtask && pendingtask.length > 0 ? (
          <>
            <div className="table-heading">Pending tasks</div>
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
                {pendingtask &&
                  pendingtask.map(
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
                          {task.isPending && (
                            <td style={{ color: "red", fontWeight: "bold" }}>
                              Pending
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
          <div className="table-heading">No Pending tasks</div>
        )}
      </div>
      {pendingtask && pendingtask.length > 0 ? (
        pendingtask.map(
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
        <div>No Pending Task</div>
      )}
    </>
  );
}

export default Pendingtask;
