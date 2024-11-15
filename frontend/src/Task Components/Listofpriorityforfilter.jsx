import { useContext } from "react";
import { TaskContext } from "./Contextprovider.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";

function Listofpriorityforfilter() {
  const { prioritylist, isLoading } = useContext(TaskContext);
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && prioritylist && (
        <div
          style={{
            border: "1px solid white",
            margin: "60px auto 20px auto",
            width: "91vw",
            borderRadius: "4px",
            padding: "5px",
          }}
        >
          {prioritylist &&
            prioritylist.length > 0 &&
            prioritylist.map(
              (priority) =>
                priority &&
                priority.priorityname && (
                  <button
                    onClick={() => {
                      navigate(`/filterbypriority/${priority.priorityname}`);
                    }}
                    key={priority._id}
                    style={{
                      backgroundColor: "#151533",
                      color: "white",
                      padding: "5px 8px",
                      border: "1px solid white",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "inline-block",
                      margin: "2px 5px",
                    }}
                  >
                    {priority.priorityname}
                  </button>
                )
            )}
        </div>
      )}
    </>
  );
}

export default Listofpriorityforfilter;
