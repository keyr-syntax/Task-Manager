import { Link } from "react-router-dom";
import "./Home.css";
import { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { TaskContext } from "./Contextprovider.jsx";
import toast from "react-hot-toast";
import Container from "react-bootstrap/Container";
function Home() {
  const {
    markaspending,
    markascompleted,
    turnoffreminder,
    deletetask,
    BASEAPI,
  } = useContext(TaskContext);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchTasks = async () => {
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

  return (
    <>
      {/* <Navbar className="justify-content-between"></Navbar> */}
      <Container style={{ maxWidth: "500px", marginTop: "70px" }}>
        <Form>
          <Form.Control
            style={{ width: "90%", margin: "30px auto 5px auto" }}
            type="search"
            placeholder="Search tasks..."
            aria-label="Search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <Button
            style={{
              backgroundColor: "#151533",
              width: "150px",
              margin: "10px auto",
              display: "block",
              border: "1px solid rgb(255,255,255,0.2)",
            }}
            onClick={() => {
              if (!keyword) {
                toast.error("Please write something \n on  the search box");
                return;
              }
              searchTasks();
            }}
          >
            Search
          </Button>
        </Form>
      </Container>
      {searchResult && searchResult.length > 0 ? (
        searchResult.map(
          (task) =>
            task && (
              <div key={task._id} className="mobile-container">
                <h2>Task</h2>
                <p>
                  Task: <span>{task.title}</span>{" "}
                </p>

                <p>
                  Status:{" "}
                  {task.isPending === true ? (
                    <span style={{ color: "red" }}>Pending</span>
                  ) : (
                    <span style={{ color: "green" }}>Completed</span>
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

export default Home;
