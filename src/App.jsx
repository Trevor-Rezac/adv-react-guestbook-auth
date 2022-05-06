import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useUserContext } from '../src/context/UserContext'

export default function App() {
  const { user, logout } = useUserContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  }

  return (<>
      <header>
        {user.email 
        ? <div>
            <h2>Hello, {user.email}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        : <div></div>}
      </header>
      <Switch>
        <Route exact path='/auth'>
          <Auth />
        </Route>
        <PrivateRoute exact path='/'>
          <Home />
        </PrivateRoute>
      </Switch>
    </>
  );
}
