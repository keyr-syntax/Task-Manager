import { useState, useContext } from "react";
import "./Createpriority.css";
import { TaskContext } from "./Contextprovider.jsx";
function Createpriority() {
  const { BASEAPI } = useContext(TaskContext);
  const [priority, setPriority] = useState("");

  const handlecreatepriority = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(`${BASEAPI}/api/priority/createpriority`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority }),
      });
      const response = await data.json();
      if (response.success) {
        console.log(response.priority);
        setPriority("");
      }
    } catch (error) {
      console.log("Error occurred while creating priority", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handlecreatepriority}>
          <h3>Create Priority</h3>
          <label className="label-date-time-picker">Priority name:</label>
          <input
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            className="input-title"
            type="text"
            placeholder="Priority name ..."
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Createpriority;
