import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, IconButton, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTasks, addTask, deleteTask, toggleTaskCompletion } from './services/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks');
      }
    };
    getTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.trim() === '') return;
    try {
      const addedTask = await addTask(newTask);
      setTasks([...tasks, addedTask]);
      setNewTask('');
    } catch (error) {
      console.error('Failed to add task');
    }
  };

  // Handle Enter key to add task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Toggle task completion
  const handleToggleCompletion = async (id, completed) => {
    try {
      const updatedTask = await toggleTaskCompletion(id, completed);
      setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Failed to toggle task completion');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Modern To-Do List with Task Completion
      </Typography>
      <TextField
        label="Add a new task"
        variant="outlined"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        style={{ marginBottom: '20px' }}
      >
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              padding: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={task.completed}
                onChange={(e) => handleToggleCompletion(task._id, e.target.checked)}
              />
              <Typography
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.task}
              </Typography>
            </div>
            <IconButton color="error" onClick={() => handleDeleteTask(task._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
