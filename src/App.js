import "./App.css";
import {authProtectedRoutes, publicRoutes} from "./routes";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Route from "./routes/Route";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/app.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          {publicRoutes.map((element, i) => (
            <Route
              exact
              key={i}
              path={element.path}
              component={element.component}
            />
          ))}
          {authProtectedRoutes.map((element, i) => (
            <Route
              layout={true}
              exact
              key={i}
              path={element.path}
              component={element.component}
            />
          ))}
        </Switch>
      </Router>
    </>
  );
}

export default App;
