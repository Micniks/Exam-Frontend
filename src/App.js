import React,{useState} from "react";
import {
  HashRouter as Router,
  Switch,
  Route} from "react-router-dom";
import { Header } from "./Header";
import { Recipes } from "./Recipes";
import { MenuPlan } from "./MenuPlan";
import { LoginAndOut } from "./LoginAndOut";
import { Admin } from "./Admin";

export default App;

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoginStatus = status => {
    setIsLoggedIn(status);
  }

  return (
    <Router>
      <div>
        <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        />
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/menuPlans">
            <MenuPlan />
          </Route>
          <Route path="/admin-page">
            <Admin />
          </Route>
          <Route path="/login-out">
            <LoginAndOut 
             loginMsg={isLoggedIn ? "Logout" : "Login"}
             isLoggedIn={isLoggedIn}
             setLoginStatus={setLoginStatus}
            />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Michael Exam 2020</p>
      <hr/>
      <h3>Documentation links</h3>
      <a href="https://jokerthewizard.dk/Exam-Backend" style={{color: "blue"}}>To Backend</a> <br/>
      <a href="https://github.com/PetersenAndreas/CA3-Gruppe3-Front" style={{color: "blue"}}>To Github FrontEnd</a> <br/>
      <a href="https://github.com/PetersenAndreas/CA3-Gruppe3" style={{color: "blue"}}>To Github BackEnd</a> <br/>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>How did you get here? You shouldn't be here..</h2>
    </div>
  )
}