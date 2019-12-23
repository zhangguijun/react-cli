import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types'
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return null;
  }
  if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

const HomeItem = Loadable({
  loader: () => import('../pages/Home'),
  loading: MyLoadingComponent
});

const CountItem = Loadable({
  loader: () => import('../pages/Count'),
  loading: MyLoadingComponent
});


const Routes = ({ history }) => (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={HomeItem} />
        <Route exact path="/count" component={CountItem} />
      </Switch>
    </Layout>
  </Router>
);
MyLoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool
};

MyLoadingComponent.defaultProps = {
  isLoading: true,
  error: false
};

Routes.propTypes = {
  history: PropTypes.object
};

Routes.defaultProps = {
  history: {}
};

export default Routes;