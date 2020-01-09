import React from 'react';
import './Landing.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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
      <p>Fresh install? New computer? Quicky sets up your developer environment with just a few clicks.</p>
      <Link to="/form" style={{ textDecoration: 'none' }}>
        {/* customize button radius & font + remove effects to match style */}
        <Button variant="contained" className={classes.button}>
        Get Started
        </Button>
      </Link>
    </div>
    )
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Landing)
