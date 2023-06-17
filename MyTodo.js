import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './MyTodo.css';

function MyTodo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post('http://localhost:5000/api/todos', { title: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };



  const deleteTodo = async (todo) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo.id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const toggleCompleted = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: !todos.find((todo) => todo.id === id).completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      );
    } catch (error) {
      console.error('Error toggling completed status:', error);
    }
  };
  
  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTodo;
