import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filterbydate.css";
import { TaskContext } from "./Contextprovider.jsx";
import Loader from "./Loader.jsx";
import Dropdown from "react-bootstrap/Dropdown";
function Filterbydate() {
  const {
    alltasks,
    isLoading,
    setIsLoading,
    markaspending,
    markascompleted,
    turnoffreminder,
    deletetask,
    turnoffrepeat,
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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const filtertasksbydate = async () => {
    setIsLoading(true);
    const createDateObject = new Date(date);

    if (isNaN(createDateObject)) {
      return;
    }
    const stringdate = createDateObject.toISOString().split("T")[0];
    const tasksbydate = await alltasks.filter((task) => {
      const convertdatetostring = new Date(task.scheduledFor)
        .toISOString()
        .split("T")[0];
      return convertdatetostring === stringdate;
    });

    const tasksFilteredBydateAndPending = tasksbydate.filter(
      (task) => task.isPending === true
    );

    setTasksfilteredbydate(tasksFilteredBydateAndPending);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
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
              onChange={(date) => {
                const utcDate = new Date(
                  Date.UTC(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                  )
                );

                setSelecteddate(utcDate);
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
                right: "15%",
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
                    width: "84%",
                    padding: "5px 10px",
                    fontSize: "18px",
                  }}
                >
                  {tasksfilteredbydate.length == 1 ? (
                    <>
                      You have {tasksfilteredbydate.length} task for {date}
                    </>
                  ) : (
                    <>
                      You have {tasksfilteredbydate.length} tasks for {date}
                    </>
                  )}
                </p>
              </>
            ) : (
              <div className="table-heading">No tasks</div>
            )}
          </div>
        </>
      )}
      {!isLoading && tasksfilteredbydate && tasksfilteredbydate.length > 0 && (
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
      {!isLoading && tasksfilteredbydate && tasksfilteredbydate.length > 0 ? (
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

export default Filterbydate;
