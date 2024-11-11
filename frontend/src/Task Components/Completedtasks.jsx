import "./Tasklist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Completedtasks() {
  const { alltasks, getalltasks } = useContext(TaskContext);
  const [completedtasks, setCompletedtasks] = useState([]);
  useEffect(() => {
    getalltasks();
  }, []);

  useEffect(() => {
    const filtercompletedtasks = () => {
      const completedtasks = alltasks.filter(
        (task) => task.isPending === false
      );
      return setCompletedtasks(completedtasks);
    };
    filtercompletedtasks();
  }, [alltasks]);

  return (
    <>
      <div className="table-container">
        {completedtasks && completedtasks.length > 0 ? (
          <>
            <div className="table-heading">Completed tasks</div>
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
                            <td style={{ color: "green", fontWeight: "bold" }}>
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
    </>
  );
}

export default Completedtasks;
