import React from 'react';
import './Landing.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function Landing(props) {
  const { classes } = props;
  return (
    <div className="Landing">
      {/* TODO: create and insert navbar component */}
      <h1>Get developing in no time!</h1>
      <p>
        Fresh install? New computer? Quicky sets up your developer environment
        with just a few clicks.
      </p>
      <Link to="/form" style={{ textDecoration: 'none' }}>
        {/* customize button radius & font + remove effects to match style */}
        {console.log(classes)}
        <Button variant="contained" className={classes.button}>
          Get Started
        </Button>
      </Link>
    </div>
  );
}

Landing.defaultProps = {
  classes: { button: 'yeet' },
};

Landing.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object),
};

export default withStyles(styles)(Landing);
