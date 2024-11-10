import { useState } from "react";
import "./Createtask.css";
function Createtask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const BASEAPI = "http://localhost:5000";
  const BASEAPI = "https://task-management-h14tquzg8-keyrs-projects.vercel.app";

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
        }),
      });
      const response = await data.json();
      if (response.success) {
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
          <h3>New Task</h3>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="input-title"
            type="text"
            placeholder="Title..."
          />
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="input-description"
            type="text"
            placeholder="Description..."
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Createtask;
