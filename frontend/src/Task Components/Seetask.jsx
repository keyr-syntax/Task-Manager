import "./Seetask.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function Seetask() {
  const { BASEAPI, task, setTask, markascompleted, deletetask, markaspending } =
    useContext(TaskContext);
  const { _id } = useParams();
  useEffect(() => {
    getonetask();
  }, [_id]);

  const getonetask = async () => {
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
        console.log("Task fetched: ", response.task);
      }
    } catch (error) {
      console.log("Error while fetching task", error);
    }
  };

  return (
    <>
      {task ? (
        <>
          <div className="seetask-container">
            <h2>Task</h2>
            <p>
              Task: <span>{task.title}</span>{" "}
            </p>
            <p>
              Description: <span>{task.description}</span>
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
            <div className="bottom-div"></div>
          </div>
          <div className="seetask-button">
            <Link to={`/edittask/${task._id}`} className="back">
              Edit
            </Link>
            {/* <button className="edit">Edit</button> */}
            <button className="edit">Add Reminder</button>
            <button
              onClick={() => {
                markascompleted(task._id);
              }}
              className="completed"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => {
                markaspending(task._id);
              }}
              className="completed"
            >
              Mark as Pending
            </button>
            <button
              onClick={() => {
                deletetask(task._id);
              }}
              className="delete"
            >
              Delete{" "}
            </button>
          </div>

          <div style={{ position: "fixed", bottom: 0, left: "3%" }}>
            <div className="mobile-task-button">
              <Link to={`/edittask/${task._id}`} className="mobile-task-edit">
                Edit
              </Link>
              <button className="edit">Reminder</button>
              <button
                onClick={() => {
                  markascompleted(task._id);
                }}
                className="completed"
              >
                Mark as Completed
              </button>
            </div>
            <div className="mobile-task-button">
              <button
                onClick={() => {
                  markaspending(task._id);
                }}
                className="completed"
              >
                Mark as Pending
              </button>
              <button
                onClick={() => {
                  deletetask(task._id);
                }}
                className="delete"
              >
                Delete{" "}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Task not found</div>
      )}
    </>
  );
}

export default Seetask;
