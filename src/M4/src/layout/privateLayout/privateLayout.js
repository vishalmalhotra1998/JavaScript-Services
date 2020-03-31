import React from 'react';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <br />
    <div>{children}</div>
  </>
);
export default PrivateLayout;