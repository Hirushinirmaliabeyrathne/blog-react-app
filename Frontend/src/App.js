import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Topbar from "./Components/topbar/Topbar";
import Home from "./Pages/Home/Home";
import Write from "./Pages/write/Write";
import Settings from "./Pages/settings/Settings";
import Login from "./Pages/Login/Login";
import Single from './Pages/Single/Single';
import Register from './Pages/Register/Register';
// import Update from './Components/SinglePost/Update';



const currentUser = true;

function App() {
  return (
   
      <Router>
        <Topbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/single'element={<Single/>}/>
          <Route path='/login'element={currentUser ? <Home/> : <Login/>}/>
          <Route path='/register'element= {<Register />}/>
          <Route path='/write'element={currentUser ? <Write/> : <Register />}/>
          <Route path='/post/:postid' element = {<Single/>}/>
          {/* <Route path='/updatePost' element = {<Update/>}/> */}
        
        </Routes>
      </Router>
  );
}

export default App;
