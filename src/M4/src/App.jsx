import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import TextFields from './pages/component/textField';
import ViewRoutes from './pages/component/viewpage/viewRouter';
import AuthlayoutRoute from './routes/AuthlayoutRoutes/AuthLayoutRoutes';
import PrivatelayoutRoute from './routes/PrivatelayoutRoute/PrivatelayoutRoute';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/main" />
      </Route>
      <AuthlayoutRoute exact path="/main" component={TextFields} />
      <PrivatelayoutRoute path="/objectTable" component={ViewRoutes} />
    </Switch>
  </Router>
  );
}

export default App;
