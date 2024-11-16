import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
function Contextprovider({ children }) {
  const [task, setTask] = useState("");
  const [alltasks, setAlltasks] = useState([]);
  const [tasksfortoday, setTasksfortoday] = useState([]);
  const [onepriority, setOnepriority] = useState("");
  const [reminderlist, setReminderlist] = useState([]);
  const [prioritylist, setPrioritylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const BASEAPI = "http://localhost:5000";
  // const BASEAPI = "https://task-management-roan-eight.vercel.app";
  const BASEAPI = "https://n8gx23hb-5000.inc1.devtunnels.ms";

  useEffect(() => {
    getalltasks();
    getallpriorities();
  }, []);
  const getalltasks = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        console.log("All tasks fetched successfully", response.task);
      }
    } catch (error) {
      console.log("Error while fetching tasks", error);
    }
  };
  const fetchtasksfortoday = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(`${BASEAPI}/api/task/fetchtasksfortoday`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setTasksfortoday(response.task);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching tasks for today", error);
    }
  };

  const deletetask = async (_id) => {
    if (window.confirm("Confirm Delete")) {
      setIsLoading(true);
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
          fetchtasksfortoday();
          setIsLoading(false);
          navigate("/alltasks");
        }
      } catch (error) {
        console.log("Error while deleting task", error);
      }
    }
  };
  const markascompleted = async (_id) => {
    try {
      setIsLoading(true);
      const data = await fetch(`${BASEAPI}/api/task/markascompleted/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setTask(response.task);
        fetchtasksfortoday();
        getalltasks();
        setIsLoading(false);
        console.log(response.task);
      }
    } catch (error) {
      console.log("Error while marking task as completed", error);
    }
  };
  const markaspending = async (_id) => {
    try {
      setIsLoading(true);
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
        fetchtasksfortoday();
        setIsLoading(false);
        console.log(response.task);
      }
    } catch (error) {
      console.log("Error while marking task as completed", error);
    }
  };
  const fetchtaskonreminderlist = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${BASEAPI}/api/task/fetchtasksonreminderlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setReminderlist(response.task);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching tasks on reminder list", error);
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
        setTask(response.task);
        fetchtaskonreminderlist();
        getalltasks();
        fetchtasksfortoday();
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while turning off reminder", error);
    }
  };
  const getallpriorities = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${BASEAPI}/api/priority/fetchallpriority`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.success) {
        setPrioritylist(response.priority);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching priorities", error);
    }
  };
  const getonepriority = async (_id) => {
    try {
      setIsLoading(true);
      const data = await fetch(`${BASEAPI}/api/priority/fetchpriority/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();

      if (response.success) {
        setOnepriority(response.priority);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching one priority", error);
    }
  };
  const deletepriority = async (_id) => {
    if (window.confirm("Confirm Delete action")) {
      try {
        setIsLoading(true);
        const data = await fetch(
          `${BASEAPI}/api/priority/deletepriority/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await data.json();
        if (response.success) {
          getallpriorities();
          setIsLoading(false);
          console.log("Priority deleted successfully");
        }
      } catch (error) {
        console.log("Error while deleting priority", error);
      }
    }
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
          fetchtaskonreminderlist,
          reminderlist,
          turnoffreminder,
          getallpriorities,
          prioritylist,
          getonepriority,
          onepriority,
          deletepriority,
          tasksfortoday,
          fetchtasksfortoday,
          isLoading,
          setIsLoading,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
}

export default Contextprovider;
