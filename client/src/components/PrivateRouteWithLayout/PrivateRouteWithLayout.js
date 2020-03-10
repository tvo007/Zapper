import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRouteWithLayout = props => {
  const {
    layout: Layout,
    component: Component,
    auth: {isAuthenticated, loading},
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={matchProps =>
        !isAuthenticated && !loading
          ? <Redirect to="/sign-in" />
          : <Layout>
              <Component {...matchProps} />
            </Layout>}
    />
  );
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps)(PrivateRouteWithLayout);
