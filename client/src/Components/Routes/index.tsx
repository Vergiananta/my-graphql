import { Switch } from 'react-router-dom';
import { Route } from "react-router-dom";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <p>Home</p>
        <p>This is Home Page</p>
      </Route>
    </Switch>
  );
};
