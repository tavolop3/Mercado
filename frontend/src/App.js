import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/users');
      setUsers(result.data);
    }
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/users/login" element={<LoginScreen />} />
        <Route path="/users/registration" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
