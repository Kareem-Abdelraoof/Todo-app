import { Link } from 'react-router-dom';

export default function CustomLink({ attributes, text }) {
  return <Link {...attributes}>{text}</Link>;
}
