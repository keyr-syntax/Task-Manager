import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RepeatTaskList.css";
import Dropdown from "react-bootstrap/Dropdown";
function RepeatTaskList() {
  const [repeatlist, setRepeatlist] = useState([]);
  const {
    turnoffrepeat,
    markaspending,
    markascompleted,
    deletetask,
    alltasks,
    getalltasks,
    turnoffreminder,
  } = useContext(TaskContext);
  useEffect(() => {
    getalltasks();
    const interval = setInterval(() => {
      getalltasks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filtertasksonrepeatlist();
    const interval = setInterval(() => {
      filtertasksonrepeatlist();
    }, 5000);

    return () => clearInterval(interval);
  }, [alltasks]);

  const filtertasksonrepeatlist = () => {
    const tasksonrepeatlist = alltasks.filter(
      (task) => task.addOnRepeatlist === true
    );
    setRepeatlist(tasksonrepeatlist);
  };
  return (
    <>
      {repeatlist && repeatlist.length > 0 ? (
        <>
          <p
            style={{
              margin: "65px 20px 30px 20px",
              textAlign: "center",
              border: "1px solid white",
              borderRadius: "6px",
              padding: "5px 5px",
            }}
          >
            Only Tasks on repeat List are listed here
          </p>
          {repeatlist.map(
            (task) =>
              task && (
                <>
                  <div key={task._id} className="taskrepeat-container">
                    <h2>Task</h2>
                    <p>
                      Task: <span>{task.title}</span>{" "}
                    </p>

                    <p>
                      Repeat Date:{" "}
                      <span>
                        {new Date(task.repeatDate).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                    </p>
                    <p>
                      Repeat Interval: <span>{task.repeatInterval}</span>
                    </p>
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
        <div></div>
      )}
    </>
  );
}

export default RepeatTaskList;
