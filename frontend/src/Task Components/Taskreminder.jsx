import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Taskreminder.css";
const socket = io("http://localhost:5000");
function Taskreminder() {
  const { deletetask, markascompleted, markaspending } =
    useContext(TaskContext);

  const [message, setMessage] = useState("");
  const [taskonreminder, setTaskonreminder] = useState("");
  useEffect(() => {
    socket.on("reminder", (data) => {
      console.log("reminder", data);
      setMessage(data.message);
      setTaskonreminder(data.task);
      if (data.message) {
        toast.success(
          `${message} 
            `,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    });
    return () => {
      socket.off("reminder");
    };
  }, []);

  return (
    <>
      {taskonreminder ? (
        <>
          <div className="seetask-container">
            <h2>Task</h2>
            <p>
              Task: <span>{taskonreminder.title}</span>{" "}
            </p>
            <p>
              Description: <span>{taskonreminder.description}</span>
            </p>
            <p>
              Status:{" "}
              {taskonreminder.isPending ? (
                <span style={{ color: "red" }}>Pending</span>
              ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Completed
                </span>
              )}
            </p>
            <p>
              Priority:
              <span>{taskonreminder.priority}</span>
            </p>
            <p>
              Due date:{" "}
              <span>
                {new Date(taskonreminder.scheduledFor).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </p>
            <p>
              Reminder set for:{" "}
              <span>
                {new Date(taskonreminder.reminder).toLocaleString("en-US", {
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
            <Link to={`/edittask/${taskonreminder._id}`} className="back">
              Edit
            </Link>
            {/* <button className="edit">Edit</button> */}
            <button className="edit">Add Reminder</button>
            <button
              onClick={() => {
                deletetask(taskonreminder._id);
              }}
              className="delete"
            >
              Delete{" "}
            </button>
            <button
              onClick={() => {
                markascompleted(taskonreminder._id);
              }}
              className="completed"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => {
                markaspending(taskonreminder._id);
              }}
              className="completed"
            >
              Mark as Pending
            </button>
          </div>

          <div style={{ position: "fixed", bottom: 0, left: "3%" }}>
            <div className="mobile-task-button">
              <Link
                to={`/edittask/${taskonreminder._id}`}
                className="mobile-task-edit"
              >
                Edit
              </Link>
              <button className="edit">Reminder</button>

              <button
                onClick={() => {
                  deletetask(taskonreminder._id);
                }}
                className="delete"
              >
                Delete{" "}
              </button>
            </div>
            <div className="mobile-task-button">
              <button
                onClick={() => {
                  markaspending(taskonreminder._id);
                }}
                className="completed"
              >
                Mark as Pending
              </button>
              <button
                onClick={() => {
                  markascompleted(taskonreminder._id);
                }}
                className="completed"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
      <ToastContainer />
    </>
  );
}

export default Taskreminder;
