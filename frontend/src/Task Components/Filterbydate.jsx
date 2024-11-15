import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filterbydate.css";
import { TaskContext } from "./Contextprovider.jsx";
function Filterbydate() {
  const {
    alltasks,
    markaspending,
    markascompleted,
    turnoffreminder,
    deletetask,
  } = useContext(TaskContext);
  const [selecteddate, setSelecteddate] = useState(null);
  const [tasksfilteredbydate, setTasksfilteredbydate] = useState([]);
  const { date } = useParams();

  useEffect(() => {
    if (date instanceof Date && !isNaN(date)) {
      const changeDateString = date.toISOString().split("T")[0];
      const filtertasks = alltasks.filter((task) => {
        const checkfordatestring =
          typeof task.scheduledFor === "string"
            ? new Date(task.scheduledFor)
            : task.scheduledFor;
        const changeDateStringForTasks =
          checkfordatestring instanceof Date && !isNaN(checkfordatestring)
            ? checkfordatestring.toISOString().split("T")[0]
            : "";
        return changeDateString === changeDateStringForTasks;
      });
      setTasksfilteredbydate(filtertasks);
    }
  }, [date, alltasks]);

  // const filtertasksbydate = (date) => {
  //   try {
  //     const changeDateString = date.toISOString().split("T")[0];
  //     const filtertasks = alltasks.filter((task) => {
  //       const checkfordatestring =
  //         typeof task.scheduledFor === "string"
  //           ? new Date(task.scheduledFor)
  //           : task.scheduledFor;
  //       const changeDateStringForTasks = checkfordatestring
  //         .toISOString()
  //         .split("T")[0];
  //       return changeDateString === changeDateStringForTasks;

  //     });
  //     setTasksfilteredbydate(filtertasks);
  //   } catch (error) {
  //     console.log("Error while filtering tasks by date", error);
  //   }
  // };
  return (
    <>
      <div
        style={{
          margin: "65px auto 30px auto",
          border: "1px solid white",
          borderRadius: "6px",
          width: "91vw",
          padding: "5px 10px",
          display: "flex",
          flexDirection: "row",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        <p
          style={{
            margin: "10px",
            fontSize: "18px",
          }}
        >
          {" "}
          Search tasks by date
        </p>
        <DatePicker
          className="datepicker-filterbydate"
          placeholderText="Select date ..."
          minDate={new Date()}
          value={selecteddate}
          selected={selecteddate}
          onChange={(selecteddate) => {
            setSelecteddate(selecteddate);
          }}
          showTimeSelect
          // dateFormat="Pp"
          dateFormat="yyyy-MM-dd"
        />
        <Link
          to={`/filterbydate/${selecteddate}`}
          style={{
            textDecoration: "none",
            textAlign: "center",
            color: "white",
            display: "block",
            margin: "5px",
            border: "1px solid white",
            padding: "5px 35px",
            borderRadius: "6px",
            float: "right",
            backgroundColor: "#151533",
            cursor: "pointer",
            right: "5%",
            position: "absolute",
            fontSize: "17px",
          }}
        >
          Search
        </Link>
      </div>
      <div className="table-container">
        {tasksfilteredbydate && tasksfilteredbydate.length > 0 ? (
          <>
            <p
              style={{
                margin: "20px auto 20px auto",
                textAlign: "center",
                border: "1px solid white",
                borderRadius: "4px",
                width: "82%",
                padding: "5px 10px",
                fontSize: "18px",
              }}
            >
              {tasksfilteredbydate.length == 1 ? (
                <>You have {tasksfilteredbydate.length} task</>
              ) : (
                <>You have {tasksfilteredbydate.length} tasks</>
              )}
            </p>

            <table>
              <thead>
                <tr className="table-head">
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>See Task</th>
                </tr>
              </thead>
              <tbody>
                {tasksfilteredbydate &&
                  tasksfilteredbydate.map(
                    (task) =>
                      task &&
                      task.isPending === true && (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>
                            {new Date(task.scheduledFor).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </td>
                          {task.isPending && (
                            <td style={{ color: "red" }}>Pending</td>
                          )}
                          <td>{task.priority}</td>

                          <td className="delete-tr">
                            <Link
                              to={`/seetask/${task._id}`}
                              className="delete-link"
                            >
                              Open
                            </Link>
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </>
        ) : (
          <div className="table-heading">No tasks</div>
        )}
      </div>
      {tasksfilteredbydate && (
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
          {tasksfilteredbydate.length == 1 ? (
            <>You have {tasksfilteredbydate.length} task</>
          ) : (
            <>You have {tasksfilteredbydate.length} tasks</>
          )}
        </p>
      )}
      {tasksfilteredbydate && tasksfilteredbydate.length >= 1 ? (
        tasksfilteredbydate.map(
          (task) =>
            task &&
            task.isPending === true && (
              <div key={task._id} className="mobile-container">
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

export default Filterbydate;
