import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Leaderboard } from './components/Leaderboard';
import { Kids } from './components/Kids';
import { Monsters } from './components/Monsters';
import { Tasks } from './components/Tasks';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
