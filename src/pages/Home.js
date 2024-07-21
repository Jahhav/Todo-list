import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "./Home.css";
import TaskList from "../components/TaskList";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const editProps = {
    editIndex,
    setEditIndex,
    editText,
    setEditText,
  };

  const API_URL = "https://669d421015704bb0e305954e.mockapi.io/tasks";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        const sortedTasks = response.data.sort(
          (a, b) =>
            a.completed - b.completed ||
            new Date(a.created_at) - new Date(b.created_at)
        );
        setTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTask = {
        text: input,
        completed: false,
        incomplete: false,
        created_at: new Date().toISOString(),
      };
      try {
        const response = await axios.post(API_URL, newTask);
        setTasks((prev) => {
          const listOfTasks = [...prev];
          const firstCompletedIndex = listOfTasks.findIndex(
            (task) => task.completed
          );
          if (firstCompletedIndex === -1) {
            listOfTasks.push(response.data);
          } else {
            listOfTasks.splice(firstCompletedIndex, 0, response.data);
          }
          return listOfTasks;
        });
        setInput("");
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  const handleDelete = async (index) => {
    const taskToDelete = tasks[index];
    try {
      await axios.delete(`${API_URL}/${taskToDelete.id}`);
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleFinish = async (index) => {
    const taskToUpdate = tasks[index];
    const updatedTask = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
      incomplete: false,
    };
    try {
      await axios.put(`${API_URL}/${taskToUpdate.id}`, updatedTask);
      const updatedTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      if (updatedTask.completed) {
        const updatedTasksOrdered = updatedTasks.filter((_, i) => i !== index);
        updatedTasksOrdered.push(updatedTask);
        setTasks(updatedTasksOrdered);
      } else {
        const unfinishedTask = updatedTasks.splice(index, 1)[0];
        const firstCompletedIndex = updatedTasks.findIndex(
          (task) => task.completed
        );
        if (firstCompletedIndex === -1) {
          updatedTasks.push(unfinishedTask);
        } else {
          updatedTasks.splice(firstCompletedIndex, 0, unfinishedTask);
        }
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleIncomplete = async (index) => {
    const taskToUpdate = tasks[index];
    let updatedTask;
    if (taskToUpdate.incomplete) {
      updatedTask = { ...taskToUpdate, incomplete: false };
    } else if (taskToUpdate.completed) {
      updatedTask = { ...taskToUpdate, incomplete: true, completed: false };
    } else {
      updatedTask = { ...taskToUpdate, completed: false, incomplete: true };
    }
    try {
      await axios.put(`${API_URL}/${taskToUpdate.id}`, updatedTask);
      const updatedTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      const completedTasks = updatedTasks.filter((task) => task.completed);
      const incompleteTasks = updatedTasks.filter((task) => !task.completed);
      const newTasks = [...incompleteTasks, ...completedTasks];
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleEdit = async (index, newText) => {
    const taskToUpdate = tasks[index];
    const updatedTask = { ...taskToUpdate, text: newText };
    try {
      await axios.put(`${API_URL}/${taskToUpdate.id}`, updatedTask);
      const updatedTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <Container className="main-home-container">
      <h1>TO-DO LIST</h1>
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onFinished={handleFinish}
        onIncomplete={handleIncomplete}
        onEdit={handleEdit}
        onEditProps={editProps}
      />
      <Form className="form-container" onSubmit={formSubmitHandler}>
        <Form.Group controlId="formTaskInput">
          <Form.Control
            className="input-field"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Add new task"
          />
        </Form.Group>
        <Button className="btn btn-primary btn-lg" type="submit">
          Add Task
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
