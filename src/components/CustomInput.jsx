export default function NewInput({ className, label = {}, input = {} }) {
  return (
    <div className={className}>
      <label {...label.attributes}>{label.text}</label>
      <input {...input} />
    </div>
  );
}
