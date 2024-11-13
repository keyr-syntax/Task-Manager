import { useState, useContext } from "react";
import "./Createpriority.css";
import { TaskContext } from "./Contextprovider.jsx";
function Createpriority() {
  const { BASEAPI, getallpriorities } = useContext(TaskContext);
  const [priorityname, setPriorityname] = useState("");

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
        console.log("priority created", response);
        console.log("priority created", response.priority);
        getallpriorities();
        setPriorityname("");
      }
    } catch (error) {
      console.log("Error occurred while creating priority", error);
    }
  };

  return (
    <>
      <div>
        <form className="form-createpriority" onSubmit={handlecreatepriority}>
          <h3>Create Priority</h3>
          <label className="label-date-time-picker-createpriority">
            Priority name:
          </label>
          <input
            value={priorityname}
            onChange={(e) => {
              setPriorityname(e.target.value);
            }}
            className="input-title-createpriority"
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
