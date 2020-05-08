import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
  iframe: {
    width: '100%',
    minHeight: 640,
    border: 0,
  },
}));

const Icons = () => {
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      NOTHING HERE FOR NOW
    </div>
  );
};

export default Icons;
