import '../App.css';
// import Home from "./home";
import Signin from "./Signin";
import Signup from "./Signup";
import VerifyLink from "./verifyLink";
import Dashboard from "./dashboard/Dashboard";
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Signin}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/auth/activate/:token" component={VerifyLink}></Route>
    </Router>
  )
}
export default App;
