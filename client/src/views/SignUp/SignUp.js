import React, {useState} from 'react';
import {Link as RouterLink, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
//import validate from 'validate.js';
import {makeStyles} from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// const schema = {
//   firstName: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 32
//     }
//   },
//   lastName: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 32
//     }
//   },
//   email: {
//     presence: { allowEmpty: false, message: 'is required' },
//     email: true,
//     length: {
//       maximum: 64
//     }
//   },
//   password: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 128
//     }
//   },
//   policy: {
//     presence: { allowEmpty: false, message: 'is required' },
//     checked: true
//   }
// };

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
  textField: {
    marginTop: theme.spacing (2),
  },
  policy: {
    marginTop: theme.spacing (1),
    display: 'flex',
    alignItems: 'center',
  },
  policyCheckbox: {
    marginLeft: '-14px',
  },
  signUpButton: {
    margin: theme.spacing (2, 0),
  },
}));

const SignUp = ({
  setAlert,
  register,
  isAuthenticated,
  history,
  createProfile,
}) => {
  const classes = useStyles ();

  const [formState, setFormState] = useState ({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {name, email, password, password2} = formState;
  // useEffect(() => {
  //   const errors = validate(formState.values, schema);

  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]);

  const handleChange = e => {
    setFormState ({...formState, [e.target.name]: e.target.value});
  };

  const handleBack = () => {
    history.goBack ();
  };

  const onSubmit = async e => {
    e.preventDefault ();
    if (password !== password2) {
      setAlert ('Passwords do not match', 'danger');
    } else {
      register ({name, email, password});
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
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
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={onSubmit}>
                <Typography className={classes.title} variant="h2">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Use your email to create new account
                </Typography>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={name}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  name="password2"
                  onChange={handleChange}
                  type="password"
                  value={password2}
                  variant="outlined"
                />
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  // disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/sign-in" variant="h6">
                    Sign in
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

SignUp.propTypes = {
  history: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

//export default withRouter(SignUp);

export default compose (
  withRouter,
  connect (mapStateToProps, {setAlert, register})
) (SignUp);
