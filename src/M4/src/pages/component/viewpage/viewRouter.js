import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import ViewPage from './viewpage';
import Table from '../../TableField';

const ViewRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} component={Table} />
            <Route exact path={`${path}/:id`} component={ViewPage} />
        </Switch>
    );
}

export default ViewRoutes;