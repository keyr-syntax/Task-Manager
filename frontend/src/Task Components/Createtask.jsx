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
import DatePicker from "react-datepicker";
import "./Createtask.css";

function Createtask() {
  const { BASEAPI, getalltasks, getallpriorities, prioritylist } =
    useContext(TaskContext);
  const [show, setShow] = useState(false);
  const [priorityname, setPriorityname] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showAddRepeat, setShowAddRepeat] = useState(false);
  const handleCloseForDueDate = () => setShowDueDate(false);
  const handleShowForDueDate = () => setShowDueDate(true);
  const handleCloseForReminder = () => setShowAddReminder(false);
  const handleShowForReminder = () => setShowAddReminder(true);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState(new Date());
  const [displayscheduledForLocalTime, setDisplayscheduledForLocalTime] =
    useState(false);
  const [displayreminderLocalTime, setDisplayreminderLocalTime] =
    useState(false);
  const [priority, setPriority] = useState("");
  const [addOnReminderlist, setaddOnReminderlist] = useState(false);
  const [reminder, setReminder] = useState(new Date());
  const [addOnRepeatlist, setaddOnRepeatlist] = useState(false);
  const [repeatInterval, setRepeatInterval] = useState("");
  const [repeatDate, setRepeatDate] = useState(new Date());
  const repeatIntervalList = ["None", "Daily", "Weekly", "Monthly"];

  const textAreaRef = useRef(null);
  const filterTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    if (
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return time.getTime() >= currentDate.getTime();
    }

    return true;
  };

  useEffect(() => {
    const now = new Date("2024-12-29T16:41:13+03:00");
    if (repeatInterval === "Daily") {
      const repeatDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      setRepeatDate(repeatDate);
    } else if (repeatInterval === "Weekly") {
      const repeatDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 7,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      setRepeatDate(repeatDate);
    } else if (repeatInterval === "Monthly") {
      const repeatDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      setRepeatDate(repeatDate);
    } else if (repeatInterval === "None") {
      setRepeatDate(null);
    }
  }, [repeatInterval]);
  useEffect(() => {
    getallpriorities();
  }, []);

  const handleDateChangeForScheduledFor = (date) => {
    if (date) {
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      );

      setScheduledFor(localDate);
      setDisplayscheduledForLocalTime(true);
      console.log("scheduledForLocalTime", localDate);
    } else {
      setScheduledFor(null);
    }
  };

  const handleDateChangeForReminder = (date) => {
    if (date) {
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      );
      setReminder(localDate);
      setReminder(localDate);
      setDisplayreminderLocalTime(true);
      setaddOnReminderlist(true);
      console.log("reminderLocalTime", localDate);
    } else {
      setReminder(null);
    }
  };

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [title]);

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
          scheduledFor: scheduledFor.toISOString(),
          priority,
          addOnReminderlist,
          reminder: reminder.toISOString(),
          addOnRepeatlist,
          repeatInterval,
          repeatDate: repeatDate.toISOString(),
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

              <Editor
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
            {!displayscheduledForLocalTime && (
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
                {displayscheduledForLocalTime && (
                  <>
                    <Form.Label className="text-light">
                      Due Date and Time
                    </Form.Label>
                    <Form.Label>
                      {scheduledFor
                        ? new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(scheduledFor)
                        : ""}
                    </Form.Label>
                  </>
                )}
              </Form.Group>
            )}
            {scheduledFor !== "" && displayreminderLocalTime && (
              <Button
                style={{
                  backgroundColor: "green",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={() => {
                  setScheduledFor("");
                  setDisplayscheduledForLocalTime(false);
                }}
              >
                Remove Due Date
              </Button>
            )}
            {!displayreminderLocalTime && (
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
                {displayreminderLocalTime && (
                  <>
                    <Form.Label className="text-light"> Reminder</Form.Label>
                    <Form.Control
                      value={
                        reminder
                          ? new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }).format(reminder)
                          : ""
                      }
                    />
                  </>
                )}
              </Form.Group>
            )}
            {displayreminderLocalTime && (
              <Button
                style={{
                  backgroundColor: "green",
                  border: "1px solid rgb(255,255,255,0.2)",
                  margin: "5px auto",
                }}
                className="w-100"
                onClick={() => {
                  setReminder("");
                  setDisplayreminderLocalTime(false);
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
                  setaddOnRepeatlist(true);
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

      <Modal show={showDueDate} onHide={handleCloseForDueDate} centered>
        <Modal.Body style={{ backgroundColor: "#151533", color: "black" }}>
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
              <DatePicker
                className="custom-datepicker"
                placeholderText="Select date and time"
                minDate={new Date()}
                filterTime={filterTime}
                customInput={
                  <input
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ced4da",
                    }}
                  />
                }
                value={
                  scheduledFor
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).format(scheduledFor)
                    : ""
                }
                selected={scheduledFor}
                onChange={handleDateChangeForScheduledFor}
                showTimeSelect
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="PP p"
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

      <Modal show={showAddReminder} onHide={handleCloseForReminder} centered>
        <Modal.Body style={{ backgroundColor: "#151533", color: "black" }}>
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
              <DatePicker
                className="custom-datepicker"
                value={
                  reminder
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).format(reminder)
                    : ""
                }
                selected={reminder}
                onChange={handleDateChangeForReminder}
                showTimeSelect
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="PP p"
                placeholderText="Select date and time"
                minDate={new Date()}
                filterTime={filterTime}
                customInput={
                  <input
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ced4da",
                    }}
                  />
                }
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
