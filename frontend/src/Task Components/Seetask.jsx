import "./Seetask.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
function Seetask() {
  const {
    // BASEAPI,
    task,
    setTask,
    markascompleted,
    deletetask,
    markaspending,
    turnoffreminder,
    alltasks,
    getalltasks,
    isLoading,
    setIsLoading,
  } = useContext(TaskContext);
  const { _id } = useParams();
  useEffect(() => {
    getalltasks();
    filteronetaskbyid();
  }, [_id]);

  // const getonetask = async () => {
  //   try {
  //     const data = await fetch(`${BASEAPI}/api/task/fetchonetask/${_id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const response = await data.json();
  //     if (response.success) {
  //       setTask(response.task);
  //       console.log("Task fetched: ", response.task);
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching task", error);
  //   }
  // };

  const filteronetaskbyid = () => {
    setIsLoading(true);
    const filteredtask = alltasks.find((task) => task._id === _id);
    setTask(filteredtask);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && task ? (
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
            <div className="mobile-open-link-container">
              <p>
                <Link
                  to={`/edittask/${task._id}`}
                  className="task-management-button"
                >
                  Edit
                </Link>
              </p>
              <p>
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
                <p>
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
                <p>
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
                <p>
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
                <p>
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
            <div className="bottom-div"></div>
          </div>

          {/* <div style={{ position: "fixed", bottom: 0, left: "3%" }}>
            <div className="mobile-task-button">
              <Link to={`/edittask/${task._id}`} className="mobile-task-edit">
                Edit
              </Link>
              {task.addOnReminderlist === true && (
                <button
                  onClick={() => {
                    turnoffreminder(task._id);
                  }}
                  className="remove"
                >
                  Remove Reminder
                </button>
              )}
              {task.addOnReminderlist === false && (
                <Link to={`/edittask/${task._id}`} className="mobile-task-edit">
                  Add Reminder
                </Link>
              )}

              <button
                onClick={() => {
                  deletetask(task._id);
                }}
                className="delete"
              >
                Delete{" "}
              </button>
            </div>
            <div className="mobile-task-button">
              {task.isPending === false && (
                <button
                  onClick={() => {
                    markaspending(task._id);
                  }}
                  className="completed"
                >
                  Mark as Pending
                </button>
              )}

              {task.isPending === true && (
                <button
                  onClick={() => {
                    markascompleted(task._id);
                  }}
                  className="completed"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div> */}
        </>
      ) : (
        <div></div>
        // <div className="seetask-button">
        //     <Link to={`/edittask/${task._id}`} className="back">
        //       Edit
        //     </Link>
        //     {/* <button className="edit">Edit</button> */}
        //     <button className="edit">Add Reminder</button>
        //     <button
        //       onClick={() => {
        //         deletetask(task._id);
        //       }}
        //       className="delete"
        //     >
        //       Delete{" "}
        //     </button>
        //     <button
        //       onClick={() => {
        //         markascompleted(task._id);
        //       }}
        //       className="completed"
        //     >
        //       Mark as Completed
        //     </button>
        //     <button
        //       onClick={() => {
        //         markaspending(task._id);
        //       }}
        //       className="completed"
        //     >
        //       Mark as Pending
        //     </button>
        //   </div>
      )}
    </>
  );
}

export default Seetask;
