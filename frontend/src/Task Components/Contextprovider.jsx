import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
function Contextprovider({ children }) {
  const [alltasks, setAlltasks] = useState([]);
  const [task, setTask] = useState("");
  const [filteredtask, setFilteredtask] = useState([]);
  const navigate = useNavigate();
  // const BASEAPI = "http://localhost:5000";
  const BASEAPI = "https://task-management-roan-eight.vercel.app";
  // const BASEAPI = "https://n8gx23hb-5000.inc1.devtunnels.ms";

  useEffect(() => {
    getalltasks();
  }, []);

  const getalltasks = async () => {
    try {
      const data = await fetch(`${BASEAPI}/api/task/fetchalltasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setAlltasks(response.task);
        console.log("All tasks fetched successfully", response.task);
      }
    } catch (error) {
      console.log("Error while fetching tasks", error);
    }
  };
  const deletetask = async (_id) => {
    if (window.confirm("Confirm Delete")) {
      try {
        const data = await fetch(`${BASEAPI}/api/task/deletetask/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        if (response.success) {
          getalltasks();
          navigate("/alltasks");
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };
  const markascompleted = async (_id) => {
    try {
      const data = await fetch(`${BASEAPI}/api/task/markascompleted/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setTask(response.task);
        getalltasks();
        console.log(response.task);
      }
    } catch (error) {
      console.log("Error while marking task as completed", error);
    }
  };
  const markaspending = async (_id) => {
    try {
      const data = await fetch(`${BASEAPI}/api/task/markaspending/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setTask(response.task);
        getalltasks();
        console.log(response.task);
      }
    } catch (error) {
      console.log("Error while marking task as completed", error);
    }
  };
  const filtertask = (level) => {
    const filtered = alltasks.filter(
      (task) => task.isPending === true && task.priority === level
    );
    return setFilteredtask(filtered);
  };
  return (
    <>
      <TaskContext.Provider
        value={{
          alltasks,
          deletetask,
          getalltasks,
          markascompleted,
          markaspending,
          task,
          setTask,
          BASEAPI,
          filtertask,
          filteredtask,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
}

export default Contextprovider;
