import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <Switch>
      <Route exact path='/auth'>
        <Auth />
      </Route>
      <PrivateRoute exact path='/'>
        <Home />
      </PrivateRoute>
    </Switch>
  );
}
