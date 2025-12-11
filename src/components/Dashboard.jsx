import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <nav className="nav-links">
        <Link to="/timers">Timers</Link>
      </nav>
    </div>
  )
}