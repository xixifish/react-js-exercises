import './App.css';
import Timers from './components/Timers';
import Dashboard from './components/Dashboard';
import { Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <div className="App">
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/timers" element={<Timers />} />
          {/* Add a 404/NotFound route */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>
    </div>
  )
}

