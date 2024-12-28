import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Filterbypriority.css";
import Dropdown from "react-bootstrap/Dropdown";
import toast from "react-hot-toast";

function Filterbypriority() {
  // const [filteredtask, setFilteredtask] = useState([]);
  // const { level } = useParams();
  const [keyword, setKeyword] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const {
    getallpriorities,
    BASEAPI,
    getalltasks,
    turnoffreminder,
    markaspending,
    markascompleted,
    isLoading,
    prioritylist,
    turnoffrepeat,
  } = useContext(TaskContext);
  useEffect(() => {
    getallpriorities();
    getalltasks();
  }, []);

  useEffect(() => {
    searchTasks();
  }, [keyword]);

  const searchTasks = async () => {
    if (keyword === null) {
      return;
    }
    try {
      const data = await fetch(
        `${BASEAPI}/api/task/searchtasks?keyword=${encodeURIComponent(keyword)}`
      );
      const response = await data.json();
      if (response.success === true) {
        setSearchResult(response.task);
        toast.success("Tasks fetched successfully");
      } else if (response.success === false) {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error while fetching search result", error);
      toast.error("Error while fetching search result");
    }
  };
  // useEffect(() => {
  //   const filtertask = (level) => {
  //     setIsLoading(true);
  //     const filtered = alltasks.filter(
  //       (task) => task.isPending === true && task.priority === level
  //     );
  //     setIsLoading(false);
  //     return setFilteredtask(filtered);
  //   };
  //   filtertask(level);
  // }, [level, alltasks]);

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
      {!isLoading && prioritylist && (
        <div
          style={{
            border: "1px solid white",
            margin: "60px auto 20px auto",
            width: "91vw",
            borderRadius: "4px",
            padding: "5px",
          }}
        >
          {prioritylist &&
            prioritylist.length > 0 &&
            prioritylist.map(
              (priority) =>
                priority &&
                priority.priorityname && (
                  <button
                    onClick={() => {
                      setKeyword(priority.priorityname);
                      console.log(priority.priorityname);
                    }}
                    key={priority._id}
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
                    {priority.priorityname}
                  </button>
                )
            )}
        </div>
      )}
      {!isLoading && searchResult && (
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
          {searchResult.length == 1 ? (
            <>You have {searchResult.length} task</>
          ) : (
            <>You have {searchResult.length} tasks</>
          )}
        </p>
      )}
      {!isLoading && searchResult && searchResult.length >= 1 ? (
        searchResult.map(
          (task) =>
            task && (
              <div key={task._id} className="mobile-container-div">
                <h2>Task</h2>
                <p>
                  Task: <span>{task.title}</span>{" "}
                </p>

                <p>
                  Status:{" "}
                  {task.isPending === true && (
                    <span style={{ color: "red" }}>Pending</span>
                  )}
                  {task.isPending === false && (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Completed
                    </span>
                  )}
                </p>
                <p>
                  Category:
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
            )
        )
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Filterbypriority;
