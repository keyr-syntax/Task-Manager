import { TaskContext } from "./Contextprovider.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Filterbypriority.css";

function Filterbypriority() {
  const { filteredtask, alltasks, filtertask } = useContext(TaskContext);

  return (
    <>
      <div
        style={{
          border: "1px solid white",
          margin: "60px auto 20px auto",
          width: "91vw",
          borderRadius: "4px",
          padding: "5px",
        }}
      >
        {alltasks &&
          alltasks.length > 0 &&
          alltasks.map(
            (task) =>
              task && (
                <button
                  onClick={() => {
                    filtertask(task.priority);
                  }}
                  key={task._id}
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
                  {task.priority}
                </button>
              )
          )}
      </div>
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
        <div></div>
      )}
    </>
  );
}

export default Filterbypriority;
