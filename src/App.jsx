import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast.success("This is a toast notification !");
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDoubleClick = (index) => {
    setEditIndex(index);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], text: e.target.value };
      setTodos(newTodos);
      setEditIndex(null);
    }
  };

  const handleBlur = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], text: inputRef.current.value };
    setTodos(newTodos);
    setEditIndex(null);
  };

  const addTodo = () => {
    if (/^[a-zA-Z0-9]/.test(inputValue)) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
      setErrorMessage('');
      toast.success('Todo added successfully');
    } else {
      toast.error('Todo must start with a letter or number');
    }
  };

  useEffect(() => {
    if (editIndex !== null) {
      inputRef.current.focus();
    }
  }, [editIndex]);
  

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} onDoubleClick={() => handleDoubleClick(index)}>
            {editIndex === index ? (
              <input
                type="text"
                defaultValue={todo.text}
                ref={inputRef}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onBlur={() => handleBlur(index)}
              />
            ) : (
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            )}
             <Badge bg="danger" as={Button}  onClick= {() => setTodos(todos.filter((_, i) => i !== index))}>
              Delete
            </Badge>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Badge bg="success"  as={Button} onClick={addTodo}>
        Add Todo
      </Badge>
    </div>
  );
};

export default TodoList;