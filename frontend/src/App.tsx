
import './App.css'
import PlayerLayout from './layouts/PlayerLayout'
import {Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Search from './pages/search/Search';


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<PlayerLayout><Home/></PlayerLayout>}/>
        <Route path='/search' element={<PlayerLayout><Search/></PlayerLayout>}/>
      </Routes>
    </>
  )
}

export default App
