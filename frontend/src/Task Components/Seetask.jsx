import "./Seetask.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
function Seetask() {
  const {
    BASEAPI,
    task,
    setTask,
    markascompleted,
    deletetask,
    markaspending,
    turnoffreminder,
    isLoading,
    setIsLoading,
  } = useContext(TaskContext);
  const { _id } = useParams();
  useEffect(() => {
    getonetask();
  }, [_id]);

  const getonetask = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(`${BASEAPI}/api/task/fetchonetask/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setTask(response.task);
        setIsLoading(false);
        console.log("Task fetched: ", response.task);
      }
    } catch (error) {
      console.log("Error while fetching task", error);
    }
  };

  return (
    <>
      {isLoading === true && <Loader />}

      {isLoading === false && task && (
        <div className="seetask-container">
          <h2>Task</h2>
          <p className="seetask-container-paragraph">
            Task: <span>{task.title}</span>{" "}
          </p>
          <p className="seetask-container-paragraph">
            Description:{" "}
            <span dangerouslySetInnerHTML={{ __html: task.description }}></span>
          </p>
          <p className="seetask-container-paragraph">
            Status:{" "}
            {task.isPending ? (
              <span style={{ color: "red" }}>Pending</span>
            ) : (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Completed
              </span>
            )}
          </p>
          <p className="seetask-container-paragraph">
            Category:
            <span>{task.priority}</span>
          </p>
          <p className="seetask-container-paragraph">
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
            <p className="seetask-container-paragraph">
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
            <p className="seetask-container-paragraph">
              <Link
                to={`/edittask/${task._id}`}
                className="task-management-button"
              >
                Edit
              </Link>
            </p>
            <p className="seetask-container-paragraph">
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
              <p className="seetask-container-paragraph">
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
              <p className="seetask-container-paragraph">
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
              <p className="seetask-container-paragraph">
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
              <p className="seetask-container-paragraph">
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
        </div>
      )}
    </>
  );
}

export default Seetask;
