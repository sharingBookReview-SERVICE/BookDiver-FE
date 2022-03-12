import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Login from './Auth/Login';
import Signup from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import Error404 from './Errors/404';

import Components from './Components';


const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);

  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/signin'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/warehousing-management'} />;
  }

  return (
    <Switch>
      <RestrictedRoute path="/components" component={Components} />
   

      <Route path="/signin" component={Login} />
   
    </Switch>
  );
};

export default Routes;
