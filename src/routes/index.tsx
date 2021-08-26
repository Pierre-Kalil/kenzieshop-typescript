import { Switch, Route, useHistory } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Cart from "../pages/Cart";

const Routes = () => {
  // const history = useHistory();
  // history.push("teste");
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
    </Switch>
  );
};

export default Routes;
