import "./Seetask.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

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
    turnoffrepeat,
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
        <>
          <div className="seetask-container">
            <h2>Task</h2>
            <p className="seetask-container-paragraph">
              Task: <span>{task.title}</span>{" "}
            </p>
            <p className="seetask-container-paragraph">
              Description:{" "}
              <span
                dangerouslySetInnerHTML={{ __html: task.description }}
              ></span>
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
            <Dropdown
              style={{
                margin: "15px auto",
                width: "50%",
                display: "block",
              }}
            >
              <Dropdown.Toggle
                style={{
                  backgroundColor: "green",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 30px",
                }}
                id="dropdown-basic"
              >
                Manage Task
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/seetask/${task._id}`}>
                  See Task Details
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/edittask/${task._id}`}>
                  Edit Task
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    deletetask(task._id);
                  }}
                  as={Link}
                >
                  Delete Task
                </Dropdown.Item>
                {task.addOnReminderlist === true && (
                  <Dropdown.Item
                    onClick={() => {
                      turnoffreminder(task._id);
                    }}
                    as={Link}
                  >
                    Turn-off Reminder
                  </Dropdown.Item>
                )}
                {task.addOnReminderlist === false && (
                  <Dropdown.Item to={`/edittask/${task._id}`} as={Link}>
                    Add Reminder
                  </Dropdown.Item>
                )}
                {task.addOnRepeatlist === true && (
                  <Dropdown.Item
                    onClick={() => {
                      turnoffrepeat(task._id);
                    }}
                    as={Link}
                  >
                    Turn-off Repeat
                  </Dropdown.Item>
                )}
                {task.addOnRepeatlist === false && (
                  <Dropdown.Item as={Link} to={`/edittask/${task._id}`}>
                    Add Repeat
                  </Dropdown.Item>
                )}
                {task.isPending === false && (
                  <Dropdown.Item
                    onClick={() => {
                      markaspending(task._id);
                    }}
                    as={Link}
                  >
                    Mark as Pending
                  </Dropdown.Item>
                )}
                {task.isPending === true && (
                  <Dropdown.Item
                    onClick={() => {
                      markascompleted(task._id);
                    }}
                    as={Link}
                  >
                    Mark as Completed
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      )}
    </>
  );
}

export default Seetask;
