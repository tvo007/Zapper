import React, {useState} from 'react';
import {Link as RouterLink, withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import {makeStyles} from '@material-ui/styles';
import {Grid, Button, TextField, Link, Typography} from '@material-ui/core';

const useStyles = makeStyles (theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down ('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/spainNightSkyPaulGilmore.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing (3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing (5),
    paddingBototm: theme.spacing (2),
    paddingLeft: theme.spacing (2),
    paddingRight: theme.spacing (2),
  },
  logoImage: {
    marginLeft: theme.spacing (4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down ('md')]: {
      justifyContent: 'center',
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down ('sm')]: {
      paddingLeft: theme.spacing (2),
      paddingRight: theme.spacing (2),
    },
  },
  title: {
    marginTop: theme.spacing (3),
  },
  socialButtons: {
    marginTop: theme.spacing (3),
  },
  socialIcon: {
    marginRight: theme.spacing (1),
  },
  sugestion: {
    marginTop: theme.spacing (2),
  },
  textField: {
    marginTop: theme.spacing (2),
  },
  signInButton: {
    margin: theme.spacing (2, 0),
  },
}));

const SignIn = ({login, isAuthenticated}) => {
  const classes = useStyles ();

  const [formState, setFormState] = useState ({
    email: '',
    password: '',
  });

  const {email, password} = formState;

  const handleChange = e => {
    e.preventDefault ();

    setFormState ({...formState, [e.target.name]: e.target.value});
  };

  const handleSignIn = async e => {
    e.preventDefault ();
    login (email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/projects" />;
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                With teamwork, the sky's the limit.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Tim Vo
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Janitor at FYB
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader} />
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={e => handleSignIn (e)}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>
                <Grid className={classes.socialButtons} container spacing={2} />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Email address"
                  name="email"
                  value={email}
                  onChange={e => handleChange (e)}
                  type="text"
                  variant="outlined"
                  required
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  name="password"
                  value={password}
                  onChange={e => handleChange (e)}
                  type="password"
                  variant="outlined"
                  required
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/sign-up" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default compose (withRouter, connect (mapStateToProps, {login})) (
  SignIn
);
