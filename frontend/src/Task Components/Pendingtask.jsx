import "./Tasklist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";
import Dropdown from "react-bootstrap/Dropdown";

function Pendingtask() {
  const {
    alltasks,
    getalltasks,
    BASEAPI,
    turnoffreminder,
    markaspending,
    markascompleted,
    isLoading,
    setIsLoading,
    turnoffrepeat,
  } = useContext(TaskContext);
  const [pendingtask, setPendingtask] = useState([]);
  useEffect(() => {
    getalltasks();
  }, []);
  useEffect(() => {
    const filterpendingtask = () => {
      setIsLoading(true);
      const filterpending = alltasks.filter((task) => task.isPending === true);
      setIsLoading(false);
      return setPendingtask(filterpending);
    };
    filterpendingtask();
  }, [alltasks]);
  const deletetask = async (_id) => {
    if (window.confirm("Confirm Delete")) {
      try {
        const data = await fetch(`${BASEAPI}/api/task/deletetask/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        if (response.success) {
          getalltasks();
          toast.success("Task Deleted successfully");
          // navigate("/completedtasks");
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <p
          style={{
            margin: "70px auto 30px auto",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "4px",
            width: "86%",
            padding: "5px 10px",
            fontSize: "16px",
          }}
        >
          You have {pendingtask.length} pending tasks
        </p>
      )}
      {!isLoading && pendingtask && pendingtask.length > 0 ? (
        pendingtask.map(
          (task, index) =>
            task && (
              <>
                <div key={index} className="mobile-container-div">
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
        )
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Pendingtask;
