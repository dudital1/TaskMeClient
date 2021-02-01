import '../App.css';
import Main from "./dashboard/main";
// import Home from "./home";
import Signin from "./Signin";
import Signup from "./Signup";
import VerifyLink from "./verifyLink";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Signin}></Route>
      <Route exact path="/main" component={Main}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/auth/activate/:token" component={VerifyLink}></Route>
    </Router>
  )
}
export default App;
