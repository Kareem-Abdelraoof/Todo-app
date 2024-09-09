// CustomTextarea.js
export default function CustomTextArea({ className, label = {}, input = {} }) {
  return (
    <div className={className}>
      <label {...label.attributes}>{label.text}</label>
      <textarea {...input}></textarea>
    </div>
  );
}
