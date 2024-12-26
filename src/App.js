import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/todos/");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      await axios.post("http://127.0.0.1:8000/api/todos/", {
        title: newTodo,
        completed: false,
      });
      setNewTodo("");
      fetchTodos();
    }
  };

  const toggleTodo = async (id, completed) => {
    await axios.patch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      completed: !completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
