import "./Prioritylist.css";
import { TaskContext } from "./Contextprovider.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader.jsx";

function Prioritylist() {
  const { prioritylist, getallpriorities, deletepriority, isLoading } =
    useContext(TaskContext);
  useEffect(() => {
    getallpriorities();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="priority-whole-wrapper">
          {prioritylist &&
            prioritylist.length > 0 &&
            prioritylist.map(
              (priority) =>
                priority &&
                priority.priorityname && (
                  <div key={priority._id} className="prioritylist-container">
                    <h2>Category</h2>
                    <p>
                      Category name: <span>{priority.priorityname}</span>{" "}
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
                  </div>
                )
            )}
        </div>
      )}
    </>
  );
}

export default Prioritylist;
