import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTask,
  getCountries,
  getLanguageCodes,
  getLocations,
} from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CreateTask.css";
import LocationSelect from "./LocationSelect";

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    keyword: "",
    language_code: "",
    location: "",
    priority: 1,
  });

  const [languageCodes, setLanguageCodes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [locationCodes, setLocationCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguageCodes();
        setLanguageCodes(response.data.tasks);
      } catch (error) {
        console.error("Failed to fetch language codes:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountryCodes(response.data.tasks);
      } catch (error) {
        console.error("Failed to fetch language codes:", error);
      }
    };

    fetchLanguages();
    fetchCountries();
  }, []);

  const fetchLocations = async (countryCode) => {
    try {
      const response = await getLocations(countryCode);
      setLocationCodes(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch language codes:", error);
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "country_code") {
      setLoading(true);
      await fetchLocations(e.target.value);
      setLoading(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTask(formData);
      toast.success("Task has been created successfully!");
      setTimeout(() => navigate("/"), 2000);
      setFormData(null);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to create task. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="create-task-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="create-task-form">
        <input
          name="keyword"
          placeholder="Keyword"
          onChange={handleChange}
          required
        />

        <select name="language" onChange={handleChange}  required>
          <option value="" style={{ color: "#888", fontWeight: "400" }}>
            Select Language
          </option>
          {languageCodes.map((lang) => (
            <option style={{color:'#000'}} key={lang.language_code} value={lang.language_code}>
              {lang.language_name} ({lang.language_code})
            </option>
          ))}
        </select>

        <LocationSelect handleChange={handleChange} />

        <input
          name="priority"
          type="number"
          placeholder="Priority"
          onChange={handleChange}
          required
        />
        <button type="submit">
          {loading ? "Creating a task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
