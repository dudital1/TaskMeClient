import '../App.css';
import Home from "./home";
import VerifyLink from "./verifyLink";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/auth/activate/:token" component={VerifyLink}></Route>
    </Router>
  )
}
export default App;
