import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import mainPage from "./components/pages/mainPage";
import mapPage from "./components/pages/detailPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={mainPage} />{" "}
        <Route path="/map" component={mapPage} />{" "}
      </Switch>
    </Router>
  );
}

export default App;
