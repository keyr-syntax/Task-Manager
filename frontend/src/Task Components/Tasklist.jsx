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
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Status</th>
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
    </>
  );
}

export default Tasklist;
