import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import ViewPage from './viewpage';
import SimpleTable from '../Tables/table';

const ViewRoutes = () => {
    const { path } = useRouteMatch();
    console.log('Vieiieieieieieieeieie');
    console.log('yyyyyyyyyyyyy', path);
    return (
        <Switch>
            <Route exact path={path} component={SimpleTable} />
            <Route exact path={`${path}/:id`} component={ViewPage} />
        </Switch>
    );
}

export default ViewRoutes;