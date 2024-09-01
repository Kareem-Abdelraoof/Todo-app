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

  const handleCancelTodoButton = () => {
    setIsCreating(false);
  };
  const handleCancelEditButton = (index) => {
    return (e) => {
      e.preventDefault();
      const newIsEditing = isEditing.map((el, i) => {
        return i === index ? !el : el;
      });
      setIsEditing(newIsEditing);
    };
  };
  return (
    <div className="todosPage-todos-container">
      <h2 className="todosPage-todos-title">Your Todos</h2>{" "}
      <div className="todosPage-buttons-container">
        <button
          className="todosPage-btn-create-todo"
          onClick={() => setIsCreating(!isCreating)}
        >
          Create Todo
        </button>
        <button className="todosPage-btn-profile" onClick={handleProfileButton}>
          Profile
        </button>
      </div>
      {/* Form for Creating a New Todo */}
      {isCreating && (
        <form className="todosPage-todo-form" onSubmit={handleCreateTodo}>
          <label className="todosPage-form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <label className="todosPage-form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Todo Description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <label className="todosPage-form-label">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleInputChange}
            />
            Completed
          </label>
          <div className="todosPage-create-todo-btn-group">
            <button type="submit" className="todosPage-btn-submit-todo">
              Add Todo
            </button>
            <button
              type="submit"
              className="todosPage-btn-submit-todo todosPage-btn-cancel-todo"
              onClick={handleCancelTodoButton}
            >
              Cancel Todo
            </button>
          </div>
        </form>
      )}
      <ul className="todosPage-todos-list">
        {todos.map((todo, index) => (
          <li className="todosPage-todo-item" key={todo._id}>
            {isEditing[index] ? (
              <form
                key={todo._id}
                className="todosPage-form-edit-todo"
                onSubmit={handleEditForm(todo._id, index)}
              >
                <label className="todosPage-form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={todo.title}
                  onChange={handleChangeOnForms(index)}
                />
                <label className="todosPage-form-label">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={todo.description}
                  onChange={handleChangeOnForms(index)}
                  rows="4"
                />
                <label>
                  <input
                    type="checkbox"
                    name="completed"
                    checked={todo.completed}
                    onChange={handleChangeOnForms(index)}
                  />
                  Completed
                </label>
                <button type="submit" className="todosPage-btn-save">
                  Save Todo
                </button>
                <button
                  type="submit"
                  className="todosPage-btn-save todosPage-btn-cancelEdit"
                  onClick={handleCancelEditButton(index)}
                >
                  Keep It
                </button>
              </form>
            ) : (
              <>
                <div
                  className={`todosPage-todo-content ${
                    todo.completed ? "todosPage-completed" : ""
                  }`}
                >
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
                <div className="todosPage-todo-actions">
                  <button
                    className="todosPage-btn-edit"
                    onClick={handleEditButton(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="todosPage-btn-delete"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <button className="todosPage-btn-logout" onClick={handleLogoutButton}>
        logout
      </button>
    </div>
  );
}
