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
                  <th>Title</th>
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
    </>
  );
}

export default Pendingtask;
