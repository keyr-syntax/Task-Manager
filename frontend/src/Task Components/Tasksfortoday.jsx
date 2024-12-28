import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tasklist.css";
import Loader from "./Loader.jsx";
import Dropdown from "react-bootstrap/Dropdown";
function Tasksfortoday() {
  const {
    tasksfortoday,
    fetchtasksfortoday,
    turnoffreminder,
    markaspending,
    markascompleted,
    deletetask,
    isLoading,
    turnoffrepeat,
  } = useContext(TaskContext);

  useEffect(() => {
    fetchtasksfortoday();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && tasksfortoday && tasksfortoday.length > 0 ? (
        <>
          <p className="tasks-for-today">Tasks for today</p>
          {tasksfortoday.map(
            (task, index) =>
              task && (
                <>
                  <div key={index} className="taskreminder-container">
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
              )
          )}
        </>
      ) : (
        <p
          style={{
            margin: "165px auto 30px auto",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "6px",
            padding: "5px 5px",
            width: "50%",
          }}
        >
          No tasks for today
        </p>
      )}
    </>
  );
}

export default Tasksfortoday;
