import './App.css';
import { Routes, Route, Navigate, useNavigate, Link, } from 'react-router-dom'
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Account from './pages/Account/Account';
import { useEffect, useState } from 'react';
import { AddContext } from './Context';
import { Button, Result } from 'antd';

function App() {
  const [renderUser, setRenderUser] = useState({
    id: '',
    username: '',
    avatar: '',
    about: '',
    email: '',
  })

  const [checkUser, setCheckUser] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
      setCheckUser(false)
      return navigate("/register");
    } else {
      setCheckUser(true)
      return navigate("/");
    }
  }, [checkUser])

  return (
    <AddContext.Provider
      value={{ renderUser, setRenderUser }}
    >
      <Header />
      <Routes>
        <Route path='/' element={<Account />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<><Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." extra={
        <Button type="primary">Back Home</Button>}
            />
          </>
        } />
      </Routes>
    </AddContext.Provider>
  );
}

export default App;
