
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login';
import Singup from './components/Singup';
import  Logout  from './components/Logout';
import { Route} from "react-router-dom";


function App() {
  return (

    <>


<Navbar/>


<Route exact path="/" >
<Home/>
</Route>

<Route exact path="/contact">
<Contact/>
</Route>

<Route  exact path="/about">
<About/>
</Route>
<Route exact  path="/singup">
<Singup/>
</Route>
<Route exact path="/login">
<Login/>
</Route>
<Route exact path="/logout">
<Logout/>
</Route>
    </>
  );
}

export default App;
