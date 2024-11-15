import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filterbydate.css";
import { TaskContext } from "./Contextprovider.jsx";
function Filterbydate() {
  const {
    alltasks,
    BASEAPI,
    markaspending,
    markascompleted,
    turnoffreminder,
    deletetask,
  } = useContext(TaskContext);
  const [selecteddate, setSelecteddate] = useState(null);
  const [tasksfilteredbydate, setTasksfilteredbydate] = useState([]);
  const { date } = useParams();

  // useEffect(() => {
  //   const fetchtasksbydate = async () => {
  //     console.log("date from params", date);

  //     const createDateObject = new Date(date);
  //     console.log("date converted to date object", createDateObject);
  //     if (isNaN(createDateObject)) {
  //       console.log("Invalid date provided");
  //       return;
  //     }
  //     const stringdate = createDateObject.toISOString().split("T")[0];
  //     console.log("date in string format: ", stringdate);
  //     const data = await fetch(
  //       `${BASEAPI}/api/task/fetchtasksbydate/${stringdate}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const response = await data.json();
  //     if (response.success) {
  //       setTasksfilteredbydate(response.task);
  //       console.log("Tasks fetched by date: ", response.task);
  //     }
  //   };
  //   fetchtasksbydate();
  // }, [date, BASEAPI, alltasks]);

  useEffect(() => {
    filtertasksbydate();
  }, [date, alltasks]);

  const filtertasksbydate = () => {
    const createDateObject = new Date(date);
    console.log("date converted to date object", createDateObject);
    if (isNaN(createDateObject)) {
      console.log("Invalid date provided");
      return;
    }
    const stringdate = createDateObject.toISOString().split("T")[0];
    console.log("date in string format: ", stringdate);
    const tasksbydate = alltasks.filter((task) => {
      const convertdatetostring = new Date(task.scheduledFor)
        .toISOString()
        .split("T")[0];
      return convertdatetostring === stringdate;
    });
    setTasksfilteredbydate(tasksbydate);
    console.log("Tasks fetched by date: ", tasksbydate);
  };

  return (
    <>
      <p
        style={{
          margin: "70px auto 10px auto",
          fontSize: "18px",
          border: "1px solid white",
          textAlign: "center",
          padding: "5px 10px",
          width: "84vw",
          borderRadius: "6px",
        }}
      >
        {" "}
        Search tasks by date
      </p>
      <div
        style={{
          margin: "15px auto 30px auto",
          border: "1px solid white",
          borderRadius: "6px",
          width: "84vw",
          padding: "5px 10px",
          display: "flex",
          flexDirection: "row",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        <DatePicker
          className="datepicker-filterbydate"
          placeholderText="Select date ..."
          minDate={new Date()}
          value={selecteddate}
          selected={selecteddate}
          onChange={(selecteddate) => {
            setSelecteddate(selecteddate);
            console.log(selecteddate);
          }}
          showTimeSelect
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
                width: "90%",
                padding: "5px 10px",
                fontSize: "18px",
              }}
            >
              {tasksfilteredbydate.length == 1 ? (
                <>
                  You have {tasksfilteredbydate.length} task for ${date}
                </>
              ) : (
                <>
                  You have {tasksfilteredbydate.length} tasks for ${date}
                </>
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
      {tasksfilteredbydate && tasksfilteredbydate.length > 0 && (
        <p
          className="counter"
          style={{
            margin: "20px auto 20px auto",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "4px",
            width: "84vw",
            padding: "5px 10px",
            fontSize: "16px",
          }}
        >
          {tasksfilteredbydate.length == 1 ? (
            <>
              You have {tasksfilteredbydate.length} task for
              <span style={{ display: "block" }}>
                {new Date(date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          ) : (
            <>
              You have {tasksfilteredbydate.length} tasks for{" "}
              <span style={{ display: "block" }}>
                {new Date(date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          )}
        </p>
      )}
      {tasksfilteredbydate && tasksfilteredbydate.length > 0 ? (
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
