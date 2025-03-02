import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createTask = async (taskData) => {
  return await axios.post(`${API_BASE_URL}/tasks/create`, taskData);
};

export const getTask = async (taskId) => {
  return await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
};
export const getAllTasks = async (page = 1, limit = 10) => {
  return axios.get(`${API_BASE_URL}/tasks/get?page=${page}&limit=${limit}`);
};
export const getTaskResults = (taskId) =>
  axios.get(`${API_BASE_URL}/tasks/results/${taskId}`);

export const getLanguageCodes = () =>
  axios.get(`${API_BASE_URL}/utils/get_language`);

export const getCountries = () =>
  axios.get(`${API_BASE_URL}/utils/get_countries`);

export const getLocations = async (searchQuery) => {
  return await axios.get(
    `${API_BASE_URL}/utils/search_location?query=${searchQuery}`
  );
};
