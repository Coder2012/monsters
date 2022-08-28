import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Leaderboard } from './components/Leaderboard';
import { Kids } from './components/Kids/Kids';
import { Monsters } from './components/Monsters';
import { Tasks } from './components/Tasks/Tasks';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Monsters />} />
          <Route path="/:admin" element={<Monsters />} />
          <Route path="/kids/:admin" element={<Kids />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/tasks/:admin" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
