import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import {RouteWithLayout} from './components';
import {PrivateRouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';
import {
  Dashboard as DashboardView,
  ProjectList as ProjectListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Project as ProjectView,
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

      <PrivateRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRouteWithLayout
        component={ProjectListView}
        exact
        layout={MainLayout}
        path="/projects"
      />
      <PrivateRouteWithLayout
        component={ProjectView} // to be refined into unique project route
        exact
        layout={MainLayout}
        path="/projects/:id"
      />
      <PrivateRouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path={authIdRoute}
      />
      <PrivateRouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <PrivateRouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project,
});

export default connect (mapStateToProps) (Routes);
