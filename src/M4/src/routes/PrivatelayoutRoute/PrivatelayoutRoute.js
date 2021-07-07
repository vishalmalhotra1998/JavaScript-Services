import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../../layout';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);
export default PrivateLayoutRoute;

PrivateLayoutRoute.propTypes = {

  component: propTypes.elementType.isRequired,

};