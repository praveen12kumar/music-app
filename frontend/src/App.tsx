
import './App.css'
import PlayerLayout from './layouts/PlayerLayout'
import {Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup';
import Profile from './pages/profile/Profile';

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<PlayerLayout><Home/></PlayerLayout>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/search' element={<PlayerLayout><Search/></PlayerLayout>}/>
        <Route path='/profile' element={<PlayerLayout><Profile/></PlayerLayout>}/>
      </Routes>
    </>
  )
}

export default App
