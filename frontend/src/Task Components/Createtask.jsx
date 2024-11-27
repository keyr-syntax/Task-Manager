import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";

function Createtask() {
  const { BASEAPI, getalltasks, getallpriorities, prioritylist } =
    useContext(TaskContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [priority, setPriority] = useState("");
  const [addOnReminderlist, setaddOnReminderlist] = useState(false);
  const [reminder, setReminder] = useState("");
  const [addOnRepeatlist, setaddOnRepeatlist] = useState(false);
  const [repeatInterval, setRepeatInterval] = useState("");
  const [repeatDate, setRepeatDate] = useState(null);
  const repeatIntervalList = ["None", "Daily", "Weekly", "Monthly"];

  const textAreaRef = useRef(null);
  useEffect(() => {
    const now = new Date();
    if (repeatInterval === "Daily") {
      const repeatDate = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      );
      setRepeatDate(repeatDate);
    } else if (repeatInterval === "Weekly") {
      const repeatDate = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 7,
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      );
      setRepeatDate(repeatDate);
    } else if (repeatInterval === "Monthly") {
      const repeatDate = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth() + 1,
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      );
      setRepeatDate(repeatDate);
    } else if (repeatInterval === "None") {
      setRepeatDate(null);
    }
  }, [repeatInterval]);

  useEffect(() => {
    getallpriorities();
  }, []);
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [description, title]);
  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log("scheduledFor:", scheduledFor);
    try {
      const data = await fetch(`${BASEAPI}/api/task/createtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          scheduledFor,
          priority,
          addOnReminderlist,
          reminder,
          addOnRepeatlist,
          repeatInterval,
          repeatDate,
        }),
      });
      const response = await data.json();
      if (response.success) {
        setDescription("");
        setTitle("");
        setScheduledFor("");
        setPriority("");
        setReminder("");
        setaddOnReminderlist(false);
        setaddOnRepeatlist(false);
        setRepeatInterval("");
        setRepeatDate(null);
        getalltasks();
        toast.success("Task added successfully");
        console.log("Task added:", response.task);
      }
    } catch (error) {
      console.log("Error while creating new task", error);
    }
  };
  return (
    <>
      {isLoading === true && <Loader />}
      {!isLoading && (
        <Container style={{ maxWidth: "500px", marginTop: "70px" }}>
          <Form
            style={{
              backgroundColor: "#151533",
              border: "1px solid rgb(255,255,255,0.2)",
              padding: "10px 20px",
            }}
            onSubmit={handleCreateTask}
            className="mb-5"
          >
            <h4 className="text-center text-light">Add new task</h4>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="text-light">Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of task"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="text-light">Task Description</Form.Label>
              <Form.Control
                as="textarea"
                ref={textAreaRef}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  adjustHeight();
                }}
                rows={2}
                placeholder="Task description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priority">
              <Form.Label className="text-light">Task Category</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                aria-label="task priority"
              >
                <option value="">Select Task Category</option>
                {prioritylist.map(
                  (level) =>
                    level &&
                    level.priorityname && (
                      <option value={level.priorityname} key={level._id}>
                        {level.priorityname}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="due date and time">
              <Form.Label className="text-light">Due Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Title of task"
                name="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={
                  scheduledFor ? scheduledFor.toISOString().slice(0, 16) : ""
                }
                onChange={(event) => {
                  const localDateString = event.target.value;
                  const localDate = new Date(localDateString);
                  const utcDate = new Date(
                    Date.UTC(
                      localDate.getFullYear(),
                      localDate.getMonth(),
                      localDate.getDate(),
                      localDate.getHours(),
                      localDate.getMinutes(),
                      localDate.getSeconds()
                    )
                  );
                  setScheduledFor(utcDate);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="add reminder">
              <Form.Label className="text-light">Add Reminder</Form.Label>

              <Form.Control
                type="datetime-local"
                placeholder="Add reminder"
                name="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={reminder ? reminder.toISOString().slice(0, 16) : ""}
                selected={reminder}
                onChange={(event) => {
                  const localDateString = event.target.value;
                  const localDate = new Date(localDateString);
                  const utcDate = new Date(
                    Date.UTC(
                      localDate.getFullYear(),
                      localDate.getMonth(),
                      localDate.getDate(),
                      localDate.getHours(),
                      localDate.getMinutes(),
                      localDate.getSeconds()
                    )
                  );
                  setReminder(utcDate);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="repeat task">
              <Form.Label className="text-light">Repeat Task</Form.Label>
              <Form.Select
                value={repeatInterval}
                onChange={(e) => {
                  setRepeatInterval(e.target.value);
                }}
                aria-label="repeat task"
              >
                <option value="">Select Repeat Interval</option>
                {repeatIntervalList.map(
                  (interval, index) =>
                    interval && (
                      <option value={interval} key={index}>
                        {interval}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#151533",
                border: "1px solid rgb(255,255,255,0.2)",
              }}
              type="submit"
              className="w-100"
            >
              Create Task
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
}

export default Createtask;
