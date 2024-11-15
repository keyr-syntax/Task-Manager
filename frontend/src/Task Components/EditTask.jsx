import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";
function EditTask() {
  const { BASEAPI, prioritylist, getallpriorities } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [priority, setPriority] = useState("");
  const [addOnReminderlist, setaddOnReminderlist] = useState("");
  const [reminder, setReminder] = useState("");
  const [category, setCategory] = useState("Miscellaneous");
  const [addreminder, setAddreminder] = useState(false);
  const [controlforremovebutton, setcontrolforremovebutton] = useState(false);
  const [now, setNow] = useState("");
  const textAreaRef = useRef(null);

  const { _id } = useParams();
  const navigate = useNavigate();
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
        const now = new Date();
        const duedate = new Date(response.task.scheduledFor);
        const reminderdate = new Date(response.task.reminder);
        setTitle(response.task.title);
        setDescription(response.task.description);
        setPriority(response.task.priority);
        setScheduledFor(duedate);
        setReminder(reminderdate);
        setaddOnReminderlist(response.task.addOnReminderlist);
        setcontrolforremovebutton(response.task.addOnReminderlist);
        setAddreminder(false);
        setNow(now);
        adjustHeight();
        console.log("Task fetched: ", response.task);
      }
    } catch (error) {
      console.log("Error while fetching task", error);
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
        }),
      });
      console.log("Is this function working?", data);
      const response = await data.json();
      console.log("Is this function working?", response);
      if (response.success) {
        console.log("task updated", response.task);
        navigate(`/seetask/${_id}`);
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
        setTitle(response.task.title);
        setDescription(response.task.description);
        setPriority(response.task.priority);
        setScheduledFor(duedate);
        setReminder(reminderdate);
        setaddOnReminderlist(response.task.addOnReminderlist);
        setcontrolforremovebutton(response.task.addOnReminderlist);
        setAddreminder(false);
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };

  return (
    <>
      <form onSubmit={edittask}>
        <h3>Edit task</h3>
        <label className="edit-label-date-time-picker">Task Title:</label>
        <textarea
          ref={textAreaRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            adjustHeight();
          }}
          // className="input-title"
          className="input-description"
          type="text"
          placeholder="Title..."
          required
        />
        <label className="edit-label-date-time-picker">Task Description:</label>
        <textarea
          ref={textAreaRef}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            adjustHeight();
          }}
          className="input-description"
          type="text"
          placeholder="write your task description..."
          required
        />
        <label className="edit-label-date-time-picker">Priority:</label>
        <select
          className="select-priority"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
          required
        >
          <option value="">Select Priority Level</option>
          {prioritylist.map(
            (level) =>
              level &&
              level.priorityname && (
                <option value={level.priorityname} key={level._id}>
                  {level.priorityname}
                </option>
              )
          )}
        </select>
        <label className="edit-label-date-time-picker">
          Due Date and Time:
        </label>

        <DatePicker
          className="date-picker"
          placeholderText="Change Due date and time..."
          minDate={new Date()}
          style={{ color: "white" }}
          value={scheduledFor}
          selected={scheduledFor}
          onChange={(scheduledFor) => {
            setScheduledFor(scheduledFor);
          }}
          showTimeSelect
          dateFormat="Pp"
        />
        {addOnReminderlist === false && addreminder === false && (
          <button
            onClick={() => {
              setAddreminder(true);
            }}
            type="button"
            className="add-reminder-button"
          >
            Add Reminder
          </button>
        )}

        {addreminder === true && (
          <button
            onClick={() => {
              setAddreminder(false);
            }}
            type="button"
            className="add-reminder-button"
          >
            Remove Reminder
          </button>
        )}
        {controlforremovebutton === true && (
          <button
            style={{ backgroundColor: "red" }}
            type="button"
            className="add-reminder-button"
            onClick={() => {
              turnoffreminder(_id);
            }}
          >
            Remove Reminder
          </button>
        )}

        {controlforremovebutton && (
          <div className="date-picker-div">
            <DatePicker
              className="date-picker"
              placeholderText="Set Reminder date and time..."
              minDate={new Date()}
              style={{ color: "white" }}
              // value={reminder}
              selected={reminder}
              onChange={(reminder) => {
                setaddOnReminderlist(true);
                setReminder(reminder);
              }}
              showTimeSelect
              dateFormat="Pp"
              required
            />
          </div>
        )}
        {addreminder && (
          <div className="date-picker-div">
            <DatePicker
              className="date-picker"
              placeholderText="Set Reminder date and time..."
              minDate={new Date()}
              style={{ color: "white" }}
              selected={now}
              value={reminder}
              onChange={(reminder) => {
                setaddOnReminderlist(true);
                setReminder(reminder);
                setNow(reminder);
              }}
              showTimeSelect
              dateFormat="Pp"
              required
            />
          </div>
        )}

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditTask;
