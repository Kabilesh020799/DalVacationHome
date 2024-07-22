import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './router/route';
import './App.css';

function App() {

  return (
    <Router>
      <MainRoute />
    </Router>
  )
}

export default App
