import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { errorCatcher } from './../utils/formUtils';
import Group from './../components/Group/Group';
import Todo from './../components/Todo';
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  logoutUser,
  getUser,
} from '../utils/api';
import {
  todosFormInputs,
  todosFormButtons,
  InputInitializer,
  ButtonInitializer,
} from './../config/formData';
import {
  changeInputState,
  objectInputOperation,
  formsInputOperation,
} from './../utils/inputUtils';
import { checkIfLoggedIn } from './../utils/pageUtils';
import { groupInputHandler } from './../components/Group/groupUtils';
import './../styles/Todos.css';

export default function Todos() {
  const emptyTodoData = {
    title: '',
    description: '',
    completed: false,
  };
  const [createFormData, setCreateFormData] = useState(emptyTodoData);
  const [isCreating, setIsCreating] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState([]);
  const toggleButton = (setState, setFormData) => (e) => {
    setState((prev) => {
      return !prev;
    });
    if (typeof setFormData === 'function') {
      setFormData(emptyTodoData);
    }
  };

  const handleCreateTodoForm = errorCatcher(async (e) => {
    e.preventDefault();
    const response = await createTodo(createFormData);
    setCreateFormData(emptyTodoData);
    setIsCreating(false);
    fetchData();
  });
  const fetchData = async () => {
    const response = await getTodos();
    setTodos(response.todos);
    setIsEditing(new Array(response.length).fill(false));
  };

  const handleEditButton = (index) => () => {
    const newIsEditing = isEditing.map((el, i) => {
      return i === index ? !el : el;
    });
    setIsEditing(newIsEditing);
  };

  const handleDeleteTodo = async (id) => {
    const response = await deleteTodo(id);
    fetchData();
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
  const navigate = useNavigate();

  const handleLogoutButton = async () => {
    await logoutUser();
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    async function loggedIn() {
      const isLoggedIn = await checkIfLoggedIn();
      if (isLoggedIn.status === true) fetchData();
      else {
        localStorage.clear();
        navigate('/login', { state: 'You Must Login First' });
      }
    }
    loggedIn();
  }, []);

  return (
    <div className="todos-container">
      <h2>Your Todos</h2>
      <div className="todos-actions">
        <button
          className="create-todo-button"
          onClick={toggleButton(setIsCreating)}
        >
          Create Todo
        </button>
        <Link className="profile-link" to="/profile">
          Profile
        </Link>
      </div>
      {isCreating && (
        <form className="todo-form" onSubmit={handleCreateTodoForm}>
          <Group
            elements={groupInputHandler(
              new InputInitializer(todosFormInputs)
                .setOnChange(
                  changeInputState(setCreateFormData, objectInputOperation)
                )
                .setValue(createFormData)
                .getData()
            )}
          />
          {/* {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )} */}

          <Group
            className="form-button-group"
            elements={groupInputHandler(
              new ButtonInitializer(todosFormButtons)
                .setAttribute({
                  nameOfButton: 'cancel',
                  nameOfAttribute: 'onClick',
                  value: toggleButton(setIsCreating, setCreateFormData),
                })
                .getData()
            )}
          />
        </form>
      )}
      <ul className="todos-list">
        {todos.map((todo, index) =>
          isEditing[index] ? (
            <form
              key={todo._id}
              className="todo-form"
              onSubmit={handleEditForm(todo._id, index)}
            >
              <Group
                elements={groupInputHandler(
                  new InputInitializer(todosFormInputs)
                    .setValue(todos[index])
                    .setOnChange(
                      changeInputState(setTodos, formsInputOperation, index)
                    )
                    .getData()
                )}
              />

              <Group
                className="form-button-group"
                elements={groupInputHandler(
                  new ButtonInitializer(todosFormButtons)
                    .setAttribute({
                      nameOfButton: 'cancel',
                      nameOfAttribute: 'onClick',
                      value: handleEditButton(index),
                    })
                    .getData()
                )}
              />
            </form>
          ) : (
            <Todo
              key={todo._id}
              className={`todo-item ${todo.completed && 'completed'}`}
              todo={{
                title: todo.title,
                description: todo.description,
                className: 'todo-parent',
              }}
              buttons={{
                className: '"todo-buttons"',
                edit: {
                  onClick: handleEditButton(index),
                  className: 'todo-button edit-button',
                },
                delete: {
                  onClick: () => handleDeleteTodo(todo._id),
                  className: 'todo-button delete-button',
                },
              }}
            />
          )
        )}
      </ul>
      <button className="logout-button" onClick={handleLogoutButton}>
        Logout
      </button>
    </div>
  );
}
