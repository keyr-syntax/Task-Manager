import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";

function Createtask() {
  const { BASEAPI, getalltasks, getallpriorities, prioritylist } =
    useContext(TaskContext);
  // useState for managing Modal
  const [show, setShow] = useState(false);
  const [priorityname, setPriorityname] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useState for managing Display of Due date, task reminder, task repeat
  const [showDueDate, setShowDueDate] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showAddRepeat, setShowAddRepeat] = useState(false);
  const handleCloseForDueDate = () => setShowDueDate(false);
  const handleShowForDueDate = () => setShowDueDate(true);
  const handleCloseForReminder = () => setShowAddReminder(false);
  const handleShowForReminder = () => setShowAddReminder(true);
  // useState for managing Form
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

  const handlecreatepriority = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(`${BASEAPI}/api/priority/createpriority`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priorityname }),
      });
      const response = await data.json();
      if (response.success) {
        toast.success("Category added successfully");
        handleClose();
        getallpriorities();
        setPriorityname("");
        setPriority(response.priority.priorityname);
      }
    } catch (error) {
      console.log("Error occurred while creating priority", error);
    }
  };
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
        setShowAddRepeat(false);
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
              {/* <Form.Control
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
              /> */}
              <Editor
                // apiKey="x8azhf2t3vo07m8hnf207hemlel93uivm5e1xxtwpo4p79xn"
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                licenseKey="gpl"
                value={description}
                onEditorChange={(newContent) => {
                  setDescription(newContent);
                }}
                init={{
                  skin: "oxide-dark",
                  height: 500,
                  plugins: [
                    "fullscreen",
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "image",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    "autosave",
                    "code",
                    "codesample",
                    "directionality",
                    "importcss",
                    "insertdatetime",
                    "preview",
                    "quickbars",
                  ],
                  toolbar:
                    " undo redo restoredraft preview paste | blocks fontfamily fontsize | fullscreen | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat codesample code ltr rtl /my-styles.css insertdatetime ",
                  fullscreen_native: true,
                  paste_as_text: true,
                  mobile: {
                    menubar: true,
                  },
                  toolbar_sticky: true,
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                }}
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
            <Button
              style={{
                backgroundColor: "#151533",
                border: "1px solid rgb(255,255,255,0.2)",
                margin: "5px auto",
              }}
              className="w-100"
              onClick={handleShow}
            >
              Add Category
            </Button>
            {scheduledFor === "" && (
              <Button
                style={{
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={handleShowForDueDate}
              >
                Add Due Date
              </Button>
            )}
            {scheduledFor !== "" && (
              <Form.Group className="mb-3" controlId="due date and time">
                <Form.Label className="text-light">
                  Due Date and Time
                </Form.Label>
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
            )}
            {scheduledFor !== "" && (
              <Button
                style={{
                  backgroundColor: "green",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={() => {
                  setScheduledFor("");
                }}
              >
                Remove Due Date
              </Button>
            )}
            {reminder === "" && (
              <Button
                style={{
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={handleShowForReminder}
              >
                Add Reminder
              </Button>
            )}
            {reminder !== "" && (
              <Form.Group className="mb-3" controlId="add reminder">
                <Form.Label className="text-light"> Reminder</Form.Label>
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
            )}
            {reminder !== "" && (
              <Button
                style={{
                  backgroundColor: "green",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={() => {
                  setReminder("");
                }}
              >
                Remove Reminder
              </Button>
            )}
            {showAddRepeat === false && (
              <Button
                style={{
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={() => {
                  setShowAddRepeat(true);
                }}
              >
                Repeat Task
              </Button>
            )}{" "}
            {showAddRepeat === true && (
              <Button
                style={{
                  backgroundColor: "green",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={() => {
                  setShowAddRepeat(false);
                }}
              >
                Remove Repeat Task
              </Button>
            )}
            {showAddRepeat === true && (
              <Form.Group className="mb-3" controlId="repeat task">
                {/* <Form.Label className="text-light">Repeat Task</Form.Label> */}
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
            )}
            <Button
              style={{
                backgroundColor: "green",
                border: "1px solid rgb(255,255,255,0.2)",
                margin: "15px auto",
              }}
              type="submit"
              className="w-100"
            >
              Create Task
            </Button>
          </Form>
        </Container>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body style={{ backgroundColor: "#151533" }}>
          <Form onSubmit={handlecreatepriority}>
            <Form.Group className="mb-3" controlId="new category">
              <Form.Label
                style={{
                  fontSize: "20px",
                  margin: "15px auto",
                  textAlign: "center",
                }}
              >
                Add Category
              </Form.Label>
              <Form.Control
                value={priorityname}
                onChange={(e) => {
                  setPriorityname(e.target.value);
                }}
                type="text"
                placeholder="write category name"
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#151533",
                margin: "10px 20px 10px auto",
                width: "45%",
              }}
              type="submit"
            >
              Submit
            </Button>
            <Button
              style={{
                backgroundColor: "#151533",
                margin: "10px auto 10px 15px ",
                width: "45%",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/*Below Modal for Adding Due Date */}
      <Modal show={showDueDate} onHide={handleCloseForDueDate} centered>
        <Modal.Body style={{ backgroundColor: "#151533" }}>
          <Form>
            <Form.Group className="mb-3" controlId="Due Date">
              <Form.Label
                style={{
                  fontSize: "20px",
                  margin: "15px auto",
                  textAlign: "center",
                }}
              >
                Add Due Date and Time
              </Form.Label>
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
            <Button
              style={{
                display: "block",
                backgroundColor: "#151533",
                margin: "10px auto 10px auto",
                width: "45%",
              }}
              onClick={handleCloseForDueDate}
            >
              Done
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/*Below Modal for Adding Reminder */}
      <Modal show={showAddReminder} onHide={handleCloseForReminder} centered>
        <Modal.Body style={{ backgroundColor: "#151533" }}>
          <Form>
            <Form.Group className="mb-3" controlId="Reminder">
              <Form.Label
                style={{
                  fontSize: "20px",
                  margin: "15px auto",
                  textAlign: "center",
                }}
              >
                Reminder
              </Form.Label>
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
            <Button
              style={{
                display: "block",
                backgroundColor: "#151533",
                margin: "10px auto 10px auto",
                width: "45%",
              }}
              onClick={handleCloseForReminder}
            >
              Done
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Createtask;
