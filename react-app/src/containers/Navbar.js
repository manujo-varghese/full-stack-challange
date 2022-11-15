/* eslint-disable react/react-in-jsx-scope */
import { Link, useMatch, useResolvedPath } from "react-router-dom"
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="articles" className="site-title">
        The Athletic
      </Link>
      <ul>
        <CustomLink to="teams">Teams</CustomLink>
        <CustomLink to="leagues">Leagues</CustomLink>
        <CustomLink to="articles">Articles</CustomLink>
        <CustomLink to="userFeed">User Feeds</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}