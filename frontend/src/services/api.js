import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend base URL

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, { task, completed: false });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Toggle task completion
export const toggleTaskCompletion = async (id, completed) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error('Error toggling task completion:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
