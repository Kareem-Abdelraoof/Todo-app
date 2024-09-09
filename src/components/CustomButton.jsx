export default function ({ attributes = {}, text = {} }) {
  return <button {...attributes}>{text}</button>;
}
