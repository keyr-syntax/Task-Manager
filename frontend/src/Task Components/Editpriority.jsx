import { useState, useContext, useEffect } from "react";
import "./Editpriority.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useNavigate, useParams } from "react-router-dom";

function Editpriority() {
  const { _id } = useParams();
  const { BASEAPI, getallpriorities } = useContext(TaskContext);
  // const [priority, setPriority] = useState("");
  const [priorityname, setPriorityname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getonepriority(_id);
  }, []);

  const getonepriority = async (_id) => {
    try {
      const data = await fetch(`${BASEAPI}/api/priority/fetchpriority/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();

      if (response.success) {
        console.log("Priority fetched", response.priority);
        console.log("Priority name", response.priority.priorityname);
        setPriorityname(response.priority.priorityname);
      }
    } catch (error) {
      console.log("Error while fetching one priority", error);
    }
  };
  const handleupdatepriority = async (e) => {
    e.preventDefault();
    console.log("handleupdatepriority is working");
    try {
      const data = await fetch(
        `${BASEAPI}/api/priority/updatepriority/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priorityname }),
        }
      );
      const response = await data.json();
      if (response.success) {
        console.log("priority updated", response.priority);
        getallpriorities();
        navigate("/prioritylist");
      }
    } catch (error) {
      console.log("Error while updating priority", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleupdatepriority} className="form-editpriority">
          <h3>Update Priority</h3>
          <label className="label-date-time-picker-editpriority">
            Priority name:
          </label>
          <input
            value={priorityname}
            onChange={(e) => {
              setPriorityname(e.target.value);
            }}
            className="input-title-editpriority"
            type="text"
            placeholder="Priority name ..."
            required
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

export default Editpriority;
