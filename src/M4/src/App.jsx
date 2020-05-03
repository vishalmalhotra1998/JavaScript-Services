import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { TextFields, Table } from './pages';
import { ViewRoutes } from './pages/component';
import { AuthlayoutRoute, PrivatelayoutRoute } from './routes/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <AuthlayoutRoute exact path="/main" component={TextFields} />
        <PrivatelayoutRoute path="/objectTable" component={ViewRoutes} />
        {/* <PrivatelayoutRoute path="/check" component={Table} /> */}
      </Switch>
    </Router>
  );
}

export default App;
