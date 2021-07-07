import React from 'react';
import propTypes from 'prop-types';

const AuthLayout = ({ children, ...rest }) => (
  <>
    <div>{children}</div>
  </>
);
export default AuthLayout;
AuthLayout.propTypes = {
  children: propTypes.element.isRequired,
};