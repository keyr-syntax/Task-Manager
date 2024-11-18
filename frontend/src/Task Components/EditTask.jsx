import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";
import Loader from "./Loader.jsx";

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

  const [now, setNow] = useState("");
  const textAreaRef = useRef(null);
  const repeatIntervalList = ["None", "Daily", "Weekly", "Monthly"];
  const { _id } = useParams();
  const navigate = useNavigate();
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
  // const filteronetaskbyid = () => {
  //   setIsLoading(true);
  //   const filteredtask = alltasks.find((task) => task._id === _id);
  //   const now = new Date();
  //   const duedate = new Date(filteredtask.scheduledFor);
  //   const reminderdate = new Date(filteredtask.reminder);
  //   const repeatdate = new Date(filteredtask.repeatDate);
  //   setRepeatDate(repeatdate);
  //   setTitle(filteredtask.title);
  //   setDescription(filteredtask.description);
  //   setPriority(filteredtask.priority);
  //   setScheduledFor(duedate);
  //   setReminder(reminderdate);
  //   setaddOnReminderlist(filteredtask.addOnReminderlist);
  //   setaddOnRepeatlist(filteredtask.addOnRepeatlist);
  //   setRepeatDate(filteredtask.repeatDate);
  //   setRepeatInterval(filteredtask.repeatInterval);
  //   setcontrolforremovebutton(filteredtask.addOnReminderlist);
  //   setcontrolforremoverepeatbutton(filteredtask.addOnRepeatlist);
  //   setAddreminder(false);
  //   setAddrepeat(false);
  //   setNow(now);
  //   setIsLoading(false);
  // };
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
        navigate(`/seetask/${_id}`);
      }
    } catch (error) {
      console.log("Error while editing task", error);
    }
  };
  const turnoffreminder = async (_id) => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };
  const turnoffrepeat = async (_id) => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
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
          <label className="edit-label-date-time-picker">
            Task Description:
          </label>
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
            style={{ color: "white" }}
            className="select-priority"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            required
          >
            <option style={{ color: "white" }} value="">
              Select Priority Level
            </option>
            {prioritylist.map(
              (level) =>
                level &&
                level.priorityname && (
                  <option
                    style={{ color: "white" }}
                    value={level.priorityname}
                    key={level._id}
                  >
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
              style={{ backgroundColor: "green" }}
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
                style={{ color: "white", width: "88%" }}
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
          {addOnRepeatlist === false && addrepeat === false && (
            <button
              style={{ width: "88%" }}
              type="button"
              className="add-reminder-button"
              onClick={() => {
                setaddOnRepeatlist(true);
                setAddrepeat(true);
              }}
            >
              Repeat
            </button>
          )}

          {addOnRepeatlist === true && addrepeat === true && (
            <button
              style={{ width: "88%" }}
              type="button"
              className="add-reminder-button"
              onClick={() => {
                setaddOnRepeatlist(false);
                setAddrepeat(false);
              }}
            >
              Donot Repeat
            </button>
          )}

          {controlforremoverepeatbutton === true && (
            <button
              style={{ backgroundColor: "green", width: "88%" }}
              type="button"
              className="add-reminder-button"
              onClick={() => {
                turnoffrepeat(_id);
              }}
            >
              Remove Repeat
            </button>
          )}

          {controlforremoverepeatbutton && (
            <p
              style={{
                border: "1px solid white",
                margin: "12px 26px",
                padding: "8px 25px",
                width: "77%",
                borderRadius: "6px",
              }}
            >
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
            <>
              <label className="label-date-time-picker">Repeat Interval</label>
              <select
                style={{ color: "white", width: "88%" }}
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
          {/* {addrepeat && addOnRepeatlist && (
            <div className="date-picker-div">{repeatDate}</div>
          )} */}
          <button type="submit">Update</button>
        </form>
      )}
    </>
  );
}

export default EditTask;
