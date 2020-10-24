import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  CardActions,
  CardHeader,
  Divider,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from '@material-ui/core';

const useStyles = makeStyles (theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing (2),
  },
  uploadButton: {
    marginRight: theme.spacing (2),
  },
}));

const PageHeader = props => {
  const {
    className,
    title,
    children,
    text1,
    text2,
    routeToProject,
    routeToTask,
    routeToSubtask,
    ...rest
  } = props;

  const classes = useStyles ();

  //dummy component that renders route info of current page and title of current page

  /**
   * <ButtonComponent
            text1={text1}
            text2={text2}
            onClick={onClick}
            variant="text"
          />
   */
  /**
   * <Grid container direction="row">

            <Button color="primary" variant="text" onClick={routeToProject}>
              {text1}
            </Button>

            {text2
              ? <Fragment>
                  <Typography variant="h2">/</Typography>
                  <Button color="primary" variant="text" onClick={routeToTask}>
                    {text2}
                  </Button>
                </Fragment>
              : null}

            {text2 && text3
              ? <Fragment>
                  <Typography variant="h2">/</Typography>
                  <Button
                    color="primary"
                    variant="text"
                    onClick={routeToSubtask}
                  >
                    {text3}
                  </Button>
                </Fragment>
              : null}
          </Grid>
   * 
   */
  /**
   * <Breadcrumbs maxItems={4} aria-label="breadcrumb">
            <Link color="primary" onClick={routeToProject}>
              <Button>
                {text1}
              </Button>
            </Link>
            <Link color="primary" onClick={routeToTask}>
              <Button>
                {text2}
              </Button>
            </Link>
            <Link color="primary" onClick={routeToSubtask}>
              <Button>
                {text3}
              </Button>
            </Link>
          </Breadcrumbs>
   */

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardHeader
        title={
          <Breadcrumbs maxItems={4} aria-label="breadcrumb">
            <Link onClick={routeToProject}>
              <Button color="primary">
                {text1}
              </Button>
            </Link>
            <Link onClick={routeToTask}>
              <Button color="primary">
                {text2}
              </Button>
            </Link>
          </Breadcrumbs>
        }
      />
      <Divider />
      <CardContent>
        <div className={classes.details}>
          <Grid container direction="column">

            <Grid container justify="space-between" direction="row">

              <Typography variant="h2">
                {title}
              </Typography>
              <CardActions />
            </Grid>
            <Grid>
              {children}
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
  // title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default PageHeader;
