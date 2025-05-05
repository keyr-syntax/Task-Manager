import { useRef, useState } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import "./Createtask.css";
function EditTask() {
  const { getalltasks, BASEAPI, prioritylist, getallpriorities } =
    useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [priority, setPriority] = useState("");
  const [addOnReminderlist, setaddOnReminderlist] = useState("");
  const [reminder, setReminder] = useState("");
  const [addOnRepeatlist, setaddOnRepeatlist] = useState(false);
  const [repeatInterval, setRepeatInterval] = useState("");
  const [repeatDate, setRepeatDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState("Miscellaneous");
  const [priorityname, setPriorityname] = useState("");

  const [showDueDate, setShowDueDate] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showAddRepeat, setShowAddRepeat] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseForDueDate = () => setShowDueDate(false);
  const handleShowForDueDate = () => setShowDueDate(true);
  const handleCloseForReminder = () => setShowAddReminder(false);
  const handleShowForReminder = () => setShowAddReminder(true);
  const [displayscheduledForLocalTime, setDisplayscheduledForLocalTime] =
    useState(false);
  const [displayreminderLocalTime, setDisplayreminderLocalTime] =
    useState(false);
  const { _id } = useParams();
  const navigate = useNavigate();
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
    getallpriorities();
  }, []);

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
      setDisplayreminderLocalTime(true);
      setaddOnReminderlist(true);
    } else {
      setReminder(null);
    }
  };
  useEffect(() => {
    const now = new Date();
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
  const textAreaRef = useRef(null);
  const repeatIntervalList = ["None", "Daily", "Weekly", "Monthly"];

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
    getonetask();

    getallpriorities();
  }, [_id]);
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [description, title]);

  const getonetask = async () => {
    try {
      const data = await fetch(`${BASEAPI}/api/task/fetchonetask/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        const duedate = new Date(response.task.scheduledFor);
        const reminderdate = new Date(response.task.reminder);
        const repeatdate = new Date(response.task.repeatDate);
        setTitle(response.task.title);
        setDescription(response.task.description);
        setPriority(response.task.priority);
        setScheduledFor(duedate);
        setReminder(reminderdate);
        setaddOnReminderlist(response.task.addOnReminderlist);
        setaddOnRepeatlist(response.task.addOnRepeatlist);
        setRepeatDate(repeatdate);
        setRepeatInterval(response.task.repeatInterval);
      }
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  const edittask = async (e) => {
    e.preventDefault();

    console.log("Is this function working?");
    try {
      const data = await fetch(`${BASEAPI}/api/task/updatetask/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          scheduledFor,
          priority,
          reminder,
          addOnReminderlist,
          category,
          addOnRepeatlist,
          repeatInterval,
          repeatDate,
        }),
      });
      console.log("Is this function working?", data);
      const response = await data.json();
      console.log("Is this function working?", response);
      if (response.success) {
        console.log("task updated", response.task);

        getalltasks();
        toast.success("Task updated successfully");
        navigate(`/seetask/${_id}`);
        // setTimeout(() => {}, 1000);
      }
    } catch (error) {
      console.log("Error while editing task", error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const turnoffreminder = async (_id) => {
    try {
      const data = await fetch(`${BASEAPI}/api/task/turnoffreminder/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        console.log("Reminder turnedoff", response.task);
        const duedate = new Date(response.task.scheduledFor);
        const reminderdate = new Date(response.task.reminder);
        const repeatdate = new Date(response.task.repeatDate);
        setTitle(response.task.title);
        setDescription(response.task.description);
        setPriority(response.task.priority);
        setScheduledFor(duedate);
        setReminder(reminderdate);
        setaddOnReminderlist(response.task.addOnReminderlist);

        setaddOnRepeatlist(response.task.addOnRepeatlist);
        setRepeatDate(repeatdate);
        setRepeatInterval(response.task.repeatInterval);

        toast.success("Task Reminder turned-off successfully");
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const turnoffrepeat = async (_id) => {
    try {
      const data = await fetch(`${BASEAPI}/api/task/turnoffrepeat/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        console.log("Repeat turned-off", response.task);
        const duedate = new Date(response.task.scheduledFor);
        const reminderdate = new Date(response.task.reminder);
        const repeatdate = new Date(response.task.repeatDate);
        setTitle(response.task.title);
        setDescription(response.task.description);
        setPriority(response.task.priority);
        setScheduledFor(duedate);
        setReminder(reminderdate);
        setaddOnReminderlist(response.task.addOnReminderlist);

        setaddOnRepeatlist(response.task.addOnRepeatlist);
        setRepeatDate(repeatdate);
        setRepeatInterval(response.task.repeatInterval);

        toast.success("Task Repeat turned-off successfully");
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };

  return (
    <>
      <Container style={{ maxWidth: "500px", marginTop: "70px" }}>
        <Form
          style={{
            backgroundColor: "#151533",
            border: "1px solid rgb(255,255,255,0.2)",
            padding: "10px 20px",
          }}
          onSubmit={edittask}
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
            Add new category
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
          {scheduledFor !== "" && displayscheduledForLocalTime && (
            <Form.Group
              style={{
                border: "1px solid rgb(255,255,255,0.2)",
                padding: "10px 10px",
                borderRadius: "6px",
              }}
              className="mb-1"
              controlId="due date and time"
            >
              {displayscheduledForLocalTime && (
                <>
                  <Form.Label
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Due Date and Time
                  </Form.Label>
                  {scheduledFor !== "" && displayscheduledForLocalTime && (
                    <Container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "15px",
                        flexWrap: "nowrap",
                      }}
                    >
                      <Form.Label style={{ wordBreak: "break-word" }}>
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
                      {scheduledFor !== "" && displayscheduledForLocalTime && (
                        <Button
                          style={{
                            backgroundColor: "green",
                            border: "1px solid rgb(255,255,255,0.2)",
                            padding: "2px 5px",
                          }}
                          onClick={() => {
                            setScheduledFor("");
                            setDisplayscheduledForLocalTime(false);
                            handleShowForDueDate();
                          }}
                        >
                          Change
                        </Button>
                      )}
                    </Container>
                  )}
                </>
              )}
            </Form.Group>
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
          {reminder !== "" && displayreminderLocalTime && (
            <Form.Group
              style={{
                border: "1px solid rgb(255,255,255,0.2)",
                padding: "10px 10px",
                borderRadius: "6px",
              }}
              className="mb-1"
              controlId="add reminder"
            >
              {displayreminderLocalTime && (
                <>
                  <Form.Label
                    style={{
                      display: "block",
                      textAlign: "center",
                      textWrap: "nowrap",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Reminder
                  </Form.Label>

                  <Container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "15px",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Form.Label style={{ wordBreak: "break-word" }}>
                      {reminder
                        ? new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(reminder)
                        : ""}
                    </Form.Label>
                    {reminder !== "" && displayreminderLocalTime && (
                      <Button
                        style={{
                          backgroundColor: "green",
                          border: "1px solid rgb(255,255,255,0.2)",
                          padding: "2px 5px",
                        }}
                        onClick={() => {
                          setReminder("");
                          setDisplayreminderLocalTime(false);
                          handleShowForReminder();
                        }}
                      >
                        Change
                      </Button>
                    )}
                  </Container>
                </>
              )}
            </Form.Group>
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
            <Form.Group
              style={{
                border: "1px solid rgb(255,255,255,0.2)",
                padding: "10px 10px",
                borderRadius: "6px",
              }}
              className="mb-1"
              controlId="repeat task"
            >
              <Form.Label
                style={{
                  display: "block",
                  textAlign: "center",
                  textWrap: "nowrap",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Repeat Interval
              </Form.Label>
              <Container
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <Form.Select
                  style={{ width: "50%" }}
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
                {showAddRepeat === true && (
                  <Button
                    style={{
                      backgroundColor: "green",
                      border: "1px solid rgb(255,255,255,0.2)",
                      padding: "2px 5px",
                    }}
                    onClick={() => {
                      setShowAddRepeat(false);
                      setRepeatDate("");
                      setRepeatInterval("");
                    }}
                  >
                    Don&apos;t repeat
                  </Button>
                )}
              </Container>
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body style={{ backgroundColor: "#151533" }}>
          <Form onSubmit={handlecreatepriority}>
            <Form.Group className="mb-3" controlId="new category">
              <Form.Label
                style={{
                  fontSize: "20px",
                  margin: "15px auto",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Add new category
              </Form.Label>
              <Form.Control
                style={{ width: "80%", display: "block", margin: "5px auto" }}
                value={priorityname}
                onChange={(e) => {
                  setPriorityname(e.target.value);
                }}
                type="text"
                placeholder="write category name"
              />
            </Form.Group>
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: "5px auto 40px auto",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#151533",
                  width: "30%",
                }}
                type="submit"
              >
                Submit
              </Button>
              <Button
                style={{
                  backgroundColor: "#151533",
                  width: "30%",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showDueDate} onHide={handleCloseForDueDate} centered>
        <Modal.Body style={{ backgroundColor: "#151533", color: "black" }}>
          <Form>
            <Form.Group
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
              }}
              className="mb-0"
              controlId="Due Date"
            >
              <Form.Label
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  color: "white",
                  margin: "10px auto",
                  display: "block",
                }}
              >
                Select Due Date and Time
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

            <Container style={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={{
                  display: "block",
                  backgroundColor: "#151533",
                  margin: "10px auto 10px auto",
                  width: "30%",
                }}
                onClick={handleCloseForDueDate}
              >
                Done
              </Button>
              <Button
                type="button"
                style={{
                  display: "block",
                  backgroundColor: "#151533",
                  margin: "10px auto 10px auto",
                  width: "30%",
                }}
                onClick={handleCloseForDueDate}
              >
                Cancel
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showAddReminder} onHide={handleCloseForReminder} centered>
        <Modal.Body style={{ backgroundColor: "#151533", color: "black" }}>
          <Form>
            <Form.Group
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
              }}
              className="mb-1"
              controlId="Reminder"
            >
              <Form.Label
                style={{
                  fontSize: "20px",
                  margin: "15px auto",
                  textAlign: "center",
                  color: "white",
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
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "15px auto",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                style={{
                  display: "block",
                  backgroundColor: "#151533",
                  width: "30%",
                }}
                onClick={handleCloseForReminder}
              >
                Done
              </Button>
              <Button
                style={{
                  display: "block",
                  backgroundColor: "#151533",
                  width: "30%",
                }}
                onClick={handleCloseForReminder}
              >
                Cancel
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditTask;
