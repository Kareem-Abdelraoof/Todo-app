export default function Todo({ className = '', todo = {}, buttons = {} }) {
  return (
    <li className={className}>
      <div className={todo.className}>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <div className={buttons.className}>
        <button {...buttons.edit}>Edit</button>
        <button {...buttons.delete}>Delete</button>
      </div>
    </li>
  );
}
