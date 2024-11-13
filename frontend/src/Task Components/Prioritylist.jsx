import "./Prioritylist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

function Prioritylist() {
  const { prioritylist, getallpriorities, deletepriority } =
    useContext(TaskContext);
  useEffect(() => {
    getallpriorities();
  }, []);

  return (
    <>
      {prioritylist &&
        prioritylist.length > 0 &&
        prioritylist.map(
          (priority) =>
            priority &&
            priority.priorityname && (
              <div key={priority._id} className="prioritylist-container">
                <h2>Priority</h2>
                <p>
                  Priority name: <span>{priority.priorityname}</span>{" "}
                </p>
                <p>
                  <Link
                    to={`/editpriority/${priority._id}`}
                    className="prioritylist-button"
                  >
                    Update
                  </Link>
                </p>
                <p>
                  <Link
                    onClick={() => {
                      deletepriority(priority._id);
                    }}
                    className="prioritylist-button"
                  >
                    Delete
                  </Link>
                </p>
                <div className="bottom-div"></div>
              </div>
            )
        )}
    </>
  );
}

export default Prioritylist;
