import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';
import PrivateRoute from './components/routing/PrivateRoute';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
} from './views';

//experiemntal redux addition
import {connect} from 'react-redux';

const Routes = ({auth: {user: _id}}) => {
  const authIdRoute = `/profile/${_id}`;

  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />

      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

      <PrivateRoute>
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path="/users"
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/projects"
        />
        <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayout
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path={authIdRoute}
        />
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
          component={SettingsView} // to be refined into unique project route
          exact
          layout={MainLayout}
          path="/project/:id"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
      </PrivateRoute>
      <Redirect to="/not-found" />
    </Switch>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps) (Routes);
