import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import _ from 'underscore';

import store from './config/redux/store';
import routes from './config/route.enum';
import Template from './component/general/template/Template';

import NotFound from './component/page/not-found/Not-Found';

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import './style/index.scss';

// create App with Router and Redux
const root = (
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Template>
                <Switch>
                    {
                        // define routes for the app on config/route.enum.js
                        _.map(routes, route =>
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={route.path}
                                component={route.component} 
                            />)
                    }
                    <Route component={NotFound} />
                </Switch>
            </Template>
        </Router>
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'))




