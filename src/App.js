import React from "react";
import {
  HashRouter,Route
} from "react-router-dom";
import SignIn from './component/SignIn'
import DashBoard from './component/Dashboard'
import ManagerDashboard from './component/ManagerDashboard'
import NotFoundComponent from './component/NotFoundComponent'
import Activities from './component/Activities'

function App() {
  return (
    <HashRouter>
        <Route exact path={"/" } component={SignIn} />
        <Route  exact path={"/dashboard" }  component={(props)=>localStorage.getItem('username') === null && localStorage.getItem('usercode') === null?<NotFoundComponent/> : (localStorage.getItem('username') === 'volunteer')?<DashBoard {...props}/>:<SignIn {...props} />} />
        <Route  exact path={"/activities"} component={Activities}/>
        <Route  exact path={"/managerdashboard" }  component={(props)=>localStorage.getItem('username') === null && localStorage.getItem('usercode') === null?<NotFoundComponent/> : (localStorage.getItem('username') === 'manager')?<ManagerDashboard {...props}/>:<SignIn {...props} />} />
    </HashRouter>
    );
  }

export default App;
