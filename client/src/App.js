import React, {useEffect} from 'react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Chart} from 'react-chartjs-2';
import {ThemeProvider} from '@material-ui/styles';
import validate from 'validate.js';
//redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import {chartjs} from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import {fromRenderProps} from 'recompose';

const browserHistory = createBrowserHistory ();

Chart.helpers.extend (Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

validate.validators = {
  ...validate.validators,
  ...validators,
};

if (localStorage.token) {
  setAuthToken (localStorage.token);
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
