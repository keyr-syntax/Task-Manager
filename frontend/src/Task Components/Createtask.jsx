import { useState, useContext, useEffect, useRef } from "react";
import "./Createtask.css";
import { TaskContext } from "./Contextprovider.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader.jsx";

function Createtask() {
  const { BASEAPI, getalltasks, prioritylist, getallpriorities } =
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
      const repeatDate = new Date();
      setRepeatDate(repeatDate.setDate(now.getDate() + 1));
    } else if (repeatInterval === "Weekly") {
      const repeatDate = new Date();
      setRepeatDate(repeatDate.setDate(now.getDate() + 7));
    } else if (repeatInterval === "Monthly") {
      const repeatDate = new Date();
      setRepeatDate(repeatDate.setMonth(now.getMonth() + 1));
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
    setIsLoading(true);
    console.log("addOnRepeatlist on form submission", addOnRepeatlist);
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
        setIsLoading(false);
        console.log("Task added:", response.task);
      }
    } catch (error) {
      console.log("Error while creating new task", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
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
            {addOnRepeatlist === false ? (
              <button
                type="button"
                className="add-reminder-button"
                onClick={() => {
                  setaddOnRepeatlist(true);
                }}
              >
                Repeat
              </button>
            ) : (
              <button
                type="button"
                className="add-reminder-button"
                onClick={() => {
                  setaddOnRepeatlist(false);
                }}
              >
                Donot Repeat
              </button>
            )}
            {addOnRepeatlist && (
              <>
                <label className="label-date-time-picker">
                  Repeat Interval
                </label>
                <select
                  className="select-priority"
                  value={repeatInterval}
                  onChange={(e) => {
                    setRepeatInterval(e.target.value);
                  }}
                  required
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
                </select>
              </>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Createtask;
