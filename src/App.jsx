import './App.css';
import Timer from './components/Timer';
import Dashboard from './components/Dashboard';
import { Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <div className="App">
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/timer" element={<Timer />} />
          {/* Add a 404/NotFound route */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  )
}

