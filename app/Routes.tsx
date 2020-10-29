/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Navbar from './components/Navbar';

// Information on React.lazy setup: https://reactjs.org/docs/code-splitting.html
// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const LazyFormTypesPage = React.lazy(() =>
  import(/* webpackChunkName: "FormTypesPage" */ './containers/FormTypesPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const FormTypesPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyFormTypesPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Navbar />
      <Switch>
        <Route path={routes.FORMTYPES} component={FormTypesPage} />
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
