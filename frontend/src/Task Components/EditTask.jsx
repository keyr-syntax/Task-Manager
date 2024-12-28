import { useRef, useState } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
function EditTask() {
  const { getalltasks, BASEAPI, prioritylist, getallpriorities } =
    useContext(TaskContext);
  const [isLoading, setIsLoading] = useState(false);
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
  const [addreminder, setAddreminder] = useState(false);
  const [addrepeat, setAddrepeat] = useState(false);
  const [controlforremovebutton, setcontrolforremovebutton] = useState(false);
  const [controlforremoverepeatbutton, setcontrolforremoverepeatbutton] =
    useState(false);

  const textAreaRef = useRef(null);
  const repeatIntervalList = ["None", "Daily", "Weekly", "Monthly"];
  const { _id } = useParams();
  const navigate = useNavigate();
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
    // filteronetaskbyid();
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
    setIsLoading(true);
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
        setcontrolforremovebutton(response.task.addOnReminderlist);
        setcontrolforremoverepeatbutton(response.task.addOnRepeatlist);
        setaddOnRepeatlist(response.task.addOnRepeatlist);
        setRepeatDate(repeatdate);
        setRepeatInterval(response.task.repeatInterval);
        setAddreminder(false);
        setAddrepeat(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  const edittask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        getalltasks();
        toast.success("Task updated successfully");
        navigate(`/seetask/${_id}`);
        // setTimeout(() => {}, 1000);
      }
    } catch (error) {
      console.log("Error while editing task", error);
    }
  };
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
        setcontrolforremovebutton(response.task.addOnReminderlist);
        setcontrolforremoverepeatbutton(response.task.addOnRepeatlist);
        setaddOnRepeatlist(response.task.addOnRepeatlist);
        setRepeatDate(repeatdate);
        setRepeatInterval(response.task.repeatInterval);
        setAddreminder(false);
        setAddrepeat(false);
        toast.success("Task Reminder turned-off successfully");
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };
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
        setcontrolforremovebutton(response.task.addOnReminderlist);
        setcontrolforremoverepeatbutton(response.task.addOnRepeatlist);
        setaddOnRepeatlist(response.task.addOnRepeatlist);
        setRepeatDate(repeatdate);
        setRepeatInterval(response.task.repeatInterval);
        setAddreminder(false);
        setAddrepeat(false);
        toast.success("Task Repeat turned-off successfully");
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
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
            onSubmit={edittask}
            className="mb-5"
          >
            <h4 className="text-center text-light">Edit task</h4>
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
            <Form.Group className="mb-3" controlId="category">
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

            {addOnReminderlist === false && addreminder === false && (
              <Button
                style={{
                  width: "100%",
                  margin: "5px auto",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                }}
                onClick={() => {
                  setAddreminder(true);
                }}
                type="button"
              >
                Add Reminder
              </Button>
            )}
            {addreminder === true && (
              <Button
                style={{
                  width: "100%",
                  margin: "5px auto",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                }}
                onClick={() => {
                  setAddreminder(false);
                }}
                type="button"
                className="add-reminder-button"
              >
                Remove Reminder
              </Button>
            )}
            {controlforremovebutton === true && (
              <Button
                style={{
                  width: "100%",
                  margin: "5px auto",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                }}
                type="button"
                className="add-reminder-button"
                onClick={() => {
                  turnoffreminder(_id);
                }}
              >
                Remove Reminder
              </Button>
            )}
            {controlforremovebutton && (
              <Form.Group className="mb-3" controlId="add reminder">
                <Form.Control
                  type="datetime-local"
                  placeholder="Change Due date and time of task"
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
                    setaddOnReminderlist(true);
                    setReminder(utcDate);
                  }}
                />
              </Form.Group>
            )}
            {addreminder && (
              <Form.Group className="mb-3" controlId="add reminder">
                <Form.Control
                  type="datetime-local"
                  placeholder="Change Due date and time of task"
                  name="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  value={
                    reminder === null
                      ? reminder.toISOString().slice(0, 16)
                      : new Date().toISOString().slice(0, 16)
                  }
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
                    setaddOnReminderlist(true);
                    setReminder(utcDate);
                  }}
                />
              </Form.Group>
            )}
            {addOnRepeatlist === false && addrepeat === false && (
              <Button
                style={{
                  width: "100%",
                  margin: "5px auto",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                }}
                type="button"
                className="add-reminder-button"
                onClick={() => {
                  setaddOnRepeatlist(true);
                  setAddrepeat(true);
                }}
              >
                Add Repeat
              </Button>
            )}
            {addOnRepeatlist === true && addrepeat === true && (
              <Button
                style={{
                  width: "100%",
                  margin: "5px auto",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                }}
                type="button"
                className="add-reminder-button"
                onClick={() => {
                  setaddOnRepeatlist(false);
                  setAddrepeat(false);
                }}
              >
                Donot Repeat
              </Button>
            )}

            {controlforremoverepeatbutton === true && (
              <Button
                style={{
                  width: "100%",
                  margin: "5px auto",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                }}
                type="button"
                onClick={() => {
                  turnoffrepeat(_id);
                }}
              >
                Remove Repeat
              </Button>
            )}
            {controlforremoverepeatbutton && (
              <p
                // style={{
                //   border: "1px solid white",
                //   margin: "12px 26px",
                //   padding: "8px 25px",
                //   width: "100%",
                //   borderRadius: "6px",
                // }}
                style={{
                  width: "100%",
                  margin: "5px auto",
                  padding: "8px 15px",
                  backgroundColor: "#151533",
                  border: "1px solid rgb(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              >
                Task will be repeated on :
                {new Date(repeatDate).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            )}
            {addOnRepeatlist === true && (
              <Form.Group className="mb-3" controlId="repeat task">
                <Form.Label style={{ padding: "8px" }} className="text-light">
                  Repeat Interval
                </Form.Label>
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
                backgroundColor: "#151533",
                border: "1px solid rgb(255,255,255,0.2)",
              }}
              type="submit"
              className="w-100"
            >
              Update Task
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
}

export default EditTask;
