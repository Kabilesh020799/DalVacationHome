import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './router/route';
import './App.css';
import NavBar from './components/navbar';

function App() {

  return (
    <Router>
      <NavBar />
      <MainRoute />
    </Router>
  )
}

export default App
