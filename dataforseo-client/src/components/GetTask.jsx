import { useState } from "react";
import { getTask } from "../services/api";
import ReactJson from "react-json-view";
import { ToastContainer, toast } from "react-toastify";
import "../styles/GetTask.css";

const GetTask = () => {
  const [taskId, setTaskId] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrieveData, setRetrieveData] = useState(false);

  const handleRetrieve = async () => {
    setLoading(true);
    try {
      const response = await getTask(taskId);
      setTaskData(response.data);
      setLoading(false);
      setRetrieveData(true);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
      setRetrieveData(true);
    }
  };

  return (
    <div className="get-task-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <h2>Retrieve Task</h2>
      <input
        placeholder="Enter Task ID"
        value={retrieveData ? "" : taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button onClick={handleRetrieve}>
        {loading ? "loading..." : "get Task"}
      </button>

      {taskData && (
        <div className="json-viewer">
          <h3>Task Details</h3>
          <ReactJson
            src={taskData}
            theme="monokai"
            collapsed={2}
            enableClipboard={true}
            displayDataTypes={false}
            displayObjectSize={false}
            style={{
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#282c34",
              color: "#fff",
              fontSize: "14px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GetTask;
