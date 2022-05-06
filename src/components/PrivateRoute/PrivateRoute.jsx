import { useLocation, Redirect, Route } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useUserContext();
  const location = useLocation();;

  return (
    <Route {...rest}>
      {user.email 
        ? (children)
        : (<Redirect to={{
            pathname: '/auth',
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
}
