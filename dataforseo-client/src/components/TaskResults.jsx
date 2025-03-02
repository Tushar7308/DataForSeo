import { useEffect, useState } from "react";
import { getAllTasks, getTaskResults } from "../services/api";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import Modal from "react-modal";
import ReactJson from "react-json-view";
import { FaSearch } from "react-icons/fa";
import "../styles/Modal.css";
import "../styles/TaskResults.css";

const TaskResults = () => {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const openModal = (task) => {
    fetchResults(task.task_id);
    setModalIsOpen(true);
  };

  useEffect(() => {
    fetchTasks(currentPage);
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const fetchTasks = async (page = 1) => {
    try {
      const response = await getAllTasks(page, 10);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const fetchResults = async (taskId) => {
    try {
      const response = await getTaskResults(taskId);
      setSelectedTask(response.data);
      toast.success("Fetched task results successfully!");
    } catch (err) {
      toast.error("Failed to get results.");
    }
  };

  return (
    <div className="task-results">
      <table>
        <thead>
          <tr>
            <th>Series no.</th>
            <th>Task ID</th>
            <th>Keyword</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length > 0 &&
            tasks.map((task, index) => {
              return (
                <tr key={task.task_id}>
                  <td>{(currentPage-1)*10+index+1}</td>
                  <td>{task.task_id}</td>
                  <td>{task.keyword}</td>
                  <td>
                    <span
                      className={`status-badge ${task.status.toLowerCase()}`}
                    >
                      {task.status}
                    </span>
                  </td>{" "}
                  <td>
                    <button
                      onClick={() => {
                        openModal(task);
                      }}
                      disabled={task.status !== "Completed"}
                      style={{
                        cursor:
                          task.status !== "Completed"
                            ? "not-allowed"
                            : "pointer",
                        opacity: task.status !== "Completed" ? 0.5 : 1,
                      }}
                      title={
                        task.status !== "Completed"
                          ? "Task must be completed to view results."
                          : ""
                      }
                    >
                      <FaSearch /> Get Results
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
      >
        <h2>Task Results</h2>

        {selectedTask && (
          <div className="json-viewer">
            <h3>Task Details</h3>
            <ReactJson
              src={selectedTask || []}
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
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span style={{ paddingTop: "5px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskResults;
