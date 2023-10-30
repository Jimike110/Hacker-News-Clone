import "./index.css";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";

function App() {
  return (
    <div className="App p-5">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/news/:id">
            <News />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
