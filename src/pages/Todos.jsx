import { useState, useEffect } from "react";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  logoutUser,
  getUser,
} from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./../styles/Todos.css";

export default function Todos() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken") || !localStorage.getItem("userId")) {
      navigate("/login");
    } else {
      async function checkIfLoggedIn() {
        const response = await getUser(localStorage.getItem("userId"));
        if (!response) {
          localStorage.clear();
          navigate("/login");
        }
      }
      checkIfLoggedIn();
    }
  }, []);

  const [isCreating, setIsCreating] = useState(false);
  const handleInputChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleProfileButton = () => {
    navigate("/profile");
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    const response = await createTodo(formData);
    setIsCreating(false);
    fetchData();
  };
  const [todos, setTodos] = useState([]);

  const [isEditing, setIsEditing] = useState([]);

  const fetchData = async () => {
    const response = await getTodos();

    console.log(
      `i'm at the fetch data and the response is ${JSON.stringify(
        response,
        null,
        2
      )}`
    );
    setTodos(response.todos);
  };

  const handleDeleteTodo = async (id) => {
    const response = await deleteTodo(id);
    console.log(response);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const emptyArray = new Array(todos.length).fill(false);
    setIsEditing(emptyArray);
  }, [todos.length]);

  const handleChangeOnForms = (index) => {
    return (e) => {
      const newTodos = todos.map((el, i) => {
        if (i === index) {
          if (e.target.type === "checkbox") {
            return { ...el, [e.target.name]: e.target.checked };
          } else {
            return { ...el, [e.target.name]: e.target.value };
          }
        }
        return el;
      });
      setTodos(newTodos);
    };
  };
  const handleEditForm = (id, index) => {
    return async (e) => {
      e.preventDefault();
      await updateTodo(id, todos[index]);

      const newIsEditing = isEditing.map((el, i) => {
        return i === index ? !el : el;
      });
      setIsEditing(newIsEditing);
    };
  };

  const handleEditButton = (index) => {
    return () => {
      const newIsEditing = isEditing.map((el, i) => {
        return i === index ? !el : el;
      });
      setIsEditing(newIsEditing);
    };
  };

  const handleLogoutButton = async () => {
    await logoutUser();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="todos-container">
      <h2 className="todos-title">Your Todos</h2>{" "}
      <div className="button-group">
        <button onClick={() => setIsCreating(!isCreating)}>Create Todo</button>
        <button onClick={handleProfileButton}>Profile</button>
      </div>
      {/* Form for Creating a New Todo */}
      {isCreating && (
        <form onSubmit={handleCreateTodo}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleInputChange}
            />
            Completed
          </label>
          <button type="submit">Save Todo</button>
        </form>
      )}
      <ul className="todos-list">
        {todos.map((todo, index) =>
          isEditing[index] ? (
            <form key={todo._id} onSubmit={handleEditForm(todo._id, index)}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={todo.title}
                onChange={handleChangeOnForms(index)}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={todo.description}
                onChange={handleChangeOnForms(index)}
              />
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  value={todo.completed}
                  onChange={handleChangeOnForms(index)}
                />
                Completed
              </label>
              <button type="submit">Save Todo</button>
            </form>
          ) : (
            <li className="todo-item" key={todo._id}>
              <div
                className={`todo-content ${
                  todo.completed ? "completed-todo" : ""
                }`}
              >
                <h3 className="todo-title">{todo.title}</h3>
                <p className="todo-description">{todo.description}</p>
              </div>
              <div className="todo-actions">
                <button
                  className="edit-button"
                  onClick={handleEditButton(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
        <button className="delete-button" onClick={handleLogoutButton}>
          log out
        </button>
      </ul>
    </div>
  );
}
