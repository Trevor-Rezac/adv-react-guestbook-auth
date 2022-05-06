import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useUserContext } from '../src/context/UserContext'
import styles from './App.css'

export default function App() {
  const { user, logout } = useUserContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  }

  return (<>
      <header>
        {user.email 
        ? <div className={styles['app-header']}>
            <h3>Hello, {user.email}!</h3>
            <button 
              onClick={handleLogout}
              className={styles['logout-btn']}>Logout</button>
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
