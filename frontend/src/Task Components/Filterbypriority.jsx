import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Filterbypriority.css";
import Listofpriorityforfilter from "./Listofpriorityforfilter.jsx";
import toast from "react-hot-toast";

function Filterbypriority() {
  const [filteredtask, setFilteredtask] = useState([]);
  const { level } = useParams();
  const {
    getallpriorities,
    BASEAPI,
    getalltasks,
    turnoffreminder,
    markaspending,
    markascompleted,
    alltasks,
    isLoading,
    setIsLoading,
  } = useContext(TaskContext);
  useEffect(() => {
    getallpriorities();
    getalltasks();
  }, []);

  useEffect(() => {
    const filtertask = (level) => {
      setIsLoading(true);
      const filtered = alltasks.filter(
        (task) => task.isPending === true && task.priority === level
      );
      setIsLoading(false);
      return setFilteredtask(filtered);
    };
    filtertask(level);
  }, [level, alltasks]);

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
      <Listofpriorityforfilter />
      {!isLoading && filteredtask && (
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
          {filteredtask.length == 1 ? (
            <>You have {filteredtask.length} task</>
          ) : (
            <>You have {filteredtask.length} tasks</>
          )}
        </p>
      )}
      {!isLoading && filteredtask && filteredtask.length >= 1 ? (
        filteredtask.map(
          (task) =>
            task &&
            task.isPending === true && (
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
                <div className="mobile-open-link-container">
                  <p>
                    <Link
                      to={`/seetask/${task._id}`}
                      className="task-management-button"
                    >
                      Open
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
