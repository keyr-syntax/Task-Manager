import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";
function EditTask() {
  const { BASEAPI } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [priority, setPriority] = useState("");
  const priority_Levels = ["Urgent", "Top", "Medium", "Low"];

  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getonetask();
  }, [_id]);

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
        const dateconverted = new Date(response.task.scheduledFor);
        setTitle(response.task.title);
        setDescription(response.task.description);
        setPriority(response.task.priority);
        setScheduledFor(dateconverted);

        console.log("Task fetched: ", response.task);
      }
    } catch (error) {
      console.log("Error while fetching task", error);
    }
  };
  const edittask = async (e) => {
    e.preventDefault();
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
        }),
      });
      const response = await data.json();
      if (response.success) {
        console.log("task updated", response.task);
        navigate(`/seetask/${_id}`);
      }
    } catch (error) {
      console.log("Error while editing task", error);
    }
  };

  return (
    <>
      <form onSubmit={edittask}>
        <h3>Edit task</h3>
        <label className="edit-label-date-time-picker">Task Title:</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="input-title"
          type="text"
          placeholder="Title..."
          required
        />
        <label className="edit-label-date-time-picker">Task Description:</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
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
          {priority_Levels.map((level, index) => (
            <option value={level} key={index}>
              {level}
            </option>
          ))}
        </select>
        <label className="edit-label-date-time-picker">
          Due Date and Time:
        </label>

        <DatePicker
          className="date-picker"
          placeholderText="Change Due date and time..."
          minDate={new Date()}
          style={{ color: "black" }}
          value={scheduledFor}
          selected={scheduledFor}
          onChange={(scheduledFor) => {
            setScheduledFor(scheduledFor);
          }}
          showTimeSelect
          dateFormat="Pp"
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditTask;
