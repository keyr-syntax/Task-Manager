import { useState, useContext } from "react";
import "./Createpriority.css";
import { TaskContext } from "./Contextprovider.jsx";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";
function Createpriority() {
  const { BASEAPI, getallpriorities, isLoading } = useContext(TaskContext);
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
        toast.success("Category added successfully");
      }
    } catch (error) {
      console.log("Error occurred while creating priority", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <form className="form-createpriority" onSubmit={handlecreatepriority}>
            <h3>Create Category</h3>
            <label className="label-date-time-picker-createpriority">
              Category name:
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
      )}
    </>
  );
}

export default Createpriority;
