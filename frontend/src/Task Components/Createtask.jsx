import { useState, useContext } from "react";
import "./Createtask.css";
import { TaskContext } from "./Contextprovider.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Createtask() {
  const { BASEAPI } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [priority, setPriority] = useState("");
  const priority_Levels = ["Urgent", "Top", "Medium", "Low"];
  // const BASEAPI = "http://localhost:5000";
  // const BASEAPI = "https://task-management-roan-eight.vercel.app";

  const handleCreateTask = async (e) => {
    e.preventDefault();
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
        }),
      });
      const response = await data.json();
      if (response.success) {
        setDescription("");
        setTitle("");
        setScheduledFor("");
        setPriority("");
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
          <label className="label-date-time-picker">Task Description:</label>
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
            {priority_Levels.map((level, index) => (
              <option value={level} key={index}>
                {level}
              </option>
            ))}
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Createtask;
