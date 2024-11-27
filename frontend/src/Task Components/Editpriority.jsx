import { useState, useContext, useEffect } from "react";
import "./Editpriority.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import toast from "react-hot-toast";

function Editpriority() {
  const { _id } = useParams();
  const { BASEAPI, getallpriorities, prioritylist, isLoading, setIsLoading } =
    useContext(TaskContext);
  // const [priority, setPriority] = useState("");
  const [priorityname, setPriorityname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // getonepriority(_id);
    filterprioritybyid(_id);
  }, []);

  const filterprioritybyid = (_id) => {
    setIsLoading(true);
    const priorityfiltered = prioritylist.find(
      (priority) => priority._id === _id
    );
    setIsLoading(false);
    return setPriorityname(priorityfiltered.priorityname);
  };

  // const getonepriority = async (_id) => {
  //   try {
  //     setIsLoading(true);
  //     const data = await fetch(`${BASEAPI}/api/priority/fetchpriority/${_id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const response = await data.json();

  //     if (response.success) {
  //       console.log("Priority fetched", response.priority);
  //       console.log("Priority name", response.priority.priorityname);
  //       setPriorityname(response.priority.priorityname);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching one priority", error);
  //   }
  // };
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
        toast.success("Task updated successfully");
        navigate("/prioritylist");
      }
    } catch (error) {
      console.log("Error while updating priority", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <form onSubmit={handleupdatepriority} className="form-editpriority">
            <h3>Update Category</h3>
            <label className="label-date-time-picker-editpriority">
              Category name:
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
      )}
    </>
  );
}

export default Editpriority;
