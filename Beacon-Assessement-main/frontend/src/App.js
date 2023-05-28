import './App.css';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import LSPage from './components/LSPage';
import Home from './components/Home';
import Login from './components/Login';
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/register" element={<SignUp />}></Route>
      <Route exact path="/dashboard" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
