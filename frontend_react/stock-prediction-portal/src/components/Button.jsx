import { Link } from 'react-router-dom'

const Button = ({ text, className, url }) => {
  return (
    <Link
      to={url}
      className={`btn ${className}`}
    >
      {text}
    </Link>
  )
}

export default Button
