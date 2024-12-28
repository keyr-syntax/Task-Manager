import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { NotebookPen } from "lucide-react";
import { TaskContext } from "./Contextprovider.jsx";
import toast from "react-hot-toast";
import Container from "react-bootstrap/Container";
import { Search } from "lucide-react";
import Dropdown from "react-bootstrap/Dropdown";
function Home() {
  const {
    markaspending,
    markascompleted,
    turnoffreminder,
    BASEAPI,
    getalltasks,
    prioritylist,
    turnoffrepeat,
  } = useContext(TaskContext);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (keyword.length > 0) {
      searchTasks();
    }
  }, [keyword.length]);
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
        setSearchResult(null);
      }
    } catch (error) {
      console.log("Error while fetching search result", error);
      toast.error("Error while fetching search result");
    }
  };
  const searchTasksAfterTaskIsDeleted = async () => {
    try {
      const data = await fetch(
        `${BASEAPI}/api/task/searchtasks?keyword=${encodeURIComponent(keyword)}`
      );
      const response = await data.json();

      if (response.success === true) {
        setSearchResult(response.task);
      } else if (response.success === false) {
        setSearchResult(null);
      }
    } catch (error) {
      console.log("Error while fetching search result", error);
      toast.error("Error while fetching search result");
    }
  };
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
          setTimeout(() => {
            searchTasksAfterTaskIsDeleted();
          }, 2000);
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };
  return (
    <>
      {/* <Navbar className="justify-content-between"></Navbar> */}
      <Container style={{ marginTop: "80px" }}>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Control
            style={{ width: "85%", borderRadius: "4px", margin: "auto" }}
            type="search"
            placeholder="Search tasks"
            aria-label="Search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <Search
            style={{
              color: "#151533",
              marginLeft: "-80px",
              marginRight: "auto",
            }}
            onClick={() => {
              if (!keyword) {
                toast.error("Please write something \n on  the search box");
                return;
              }
              searchTasks();
            }}
            size={30}
          />
        </Form>
      </Container>
      {prioritylist && (
        <div
          style={{
            margin: "15px auto 20px auto",
            width: "100vw",
            borderRadius: "4px",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
                      border: "1px solid rgb(255,255,255,0.2)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "block",
                      margin: "2px auto 2px auto",
                      width: "250px",
                    }}
                  >
                    {priority.priorityname}
                  </button>
                )
            )}
        </div>
      )}
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
                  {task.scheduledFor === null ? (
                    <span>Not added</span>
                  ) : (
                    <span>
                      {new Date(task.scheduledFor).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                  )}
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
      <NotebookPen
        onClick={() => {
          navigate("/createtask");
        }}
        size={35}
        style={{
          position: "fixed",
          zIndex: "999",
          bottom: "40",
          right: "25",
          cursor: "pointer",
        }}
      />
    </>
  );
}

export default Home;
