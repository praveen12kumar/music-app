
import './App.css'
import PlayerLayout from './layouts/PlayerLayout'
import {Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup';
import ProfileContainer from './components/organisms/profileContainer/ProfileContainer';
import EmailVerification from './pages/auth/emailVerification/EmailVerification';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Denied from './pages/Denied';
import NotFound from './pages/NotFound';
import RequireAuth from './pages/auth/requireAuth/RequireAuth';




function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<PlayerLayout><Home/></PlayerLayout>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/verify-email' element={<EmailVerification/>}/>
        <Route path='/search' element={<PlayerLayout><Search/></PlayerLayout>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/denied' element={<Denied/>}/>
        <Route path="*" element={<NotFound/>}/>

        //--------------ADMIN---------------------
          <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>

          </Route>


          //-----------------Logged in && ADMIN
          <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>}>
            <Route path='/profile' element={<PlayerLayout><ProfileContainer/></PlayerLayout>}/>
          
          
          </Route>



      
      </Routes>
    </>
  )
}

export default App
