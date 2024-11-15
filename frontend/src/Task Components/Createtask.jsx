import { useState, useContext, useEffect, useRef } from "react";
import "./Createtask.css";
import { TaskContext } from "./Contextprovider.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Createtask() {
  const { BASEAPI, getalltasks, prioritylist, getallpriorities } =
    useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [priority, setPriority] = useState("");
  const [addOnReminderlist, setaddOnReminderlist] = useState(false);
  const [reminder, setReminder] = useState("");
  const textAreaRef = useRef(null);

  // const BASEAPI = "http://localhost:5000";
  // const BASEAPI = "https://task-management-roan-eight.vercel.app";

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
    console.log("addOnReminderlist on form submission", addOnReminderlist);
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
        }),
      });
      const response = await data.json();
      if (response.success) {
        setDescription("");
        setTitle("");
        setScheduledFor("");
        setPriority("");
        setReminder("");
        getalltasks();
        console.log("Task added:", response.task);
      }
    } catch (error) {
      console.log("Error while creating new task", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleCreateTask}>
          <h3>Add new task</h3>
          <label className="label-date-time-picker">Task Title:</label>
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
          <label className="label-date-time-picker">Task Description:</label>
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
          <label className="label-date-time-picker">Priority:</label>
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
          <label className="label-date-time-picker">
            Select Due Date and Time:
          </label>
          <div className="date-picker-div">
            <DatePicker
              className="date-picker"
              placeholderText="Select Due date and time..."
              minDate={new Date()}
              style={{ color: "black" }}
              selected={scheduledFor}
              onChange={(scheduledFor) => setScheduledFor(scheduledFor)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          {addOnReminderlist === false ? (
            <button
              type="button"
              className="add-reminder-button"
              onClick={() => {
                setaddOnReminderlist(true);
                console.log(addOnReminderlist);
              }}
            >
              Add Reminder
            </button>
          ) : (
            <button
              type="button"
              className="add-reminder-button"
              onClick={() => {
                setaddOnReminderlist(false);
                console.log(addOnReminderlist);
              }}
            >
              Remove Reminder
            </button>
          )}
          {addOnReminderlist && (
            <div className="date-picker-div">
              <DatePicker
                className="date-picker"
                placeholderText="Set Reminder date and time..."
                minDate={new Date()}
                style={{ color: "white" }}
                selected={reminder}
                onChange={(reminder) => setReminder(reminder)}
                showTimeSelect
                dateFormat="Pp"
                required
              />
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Createtask;
