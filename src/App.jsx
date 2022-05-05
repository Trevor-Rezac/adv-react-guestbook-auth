import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';

export default function App() {
  return (
    <Switch>
      <Route exact path='/auth'>
        <Auth />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
    </Switch>
  );
}
