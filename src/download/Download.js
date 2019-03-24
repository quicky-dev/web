import React from 'react';
import './Download.css'
import logo from '../logo.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FilledInput } from '@material-ui/core';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

function Download(props) {
    // eslint-disable-next-line
    return (
    <div className="dl-page">
        <div className="Download">
            <img id="dl-logo" src={logo} className="App-logo" alt="logo" />
            <br></br>
            <sub>Click <a href="#!">here</a> if your download does not start automatically</sub>
        </div>
        <div className="Instructions">
            <pre>
                <code>
                    // Installation Instructions
                    <br /><br />
                    1. Copy setup script
                    <br />
                    2. Open your terminal
                    <br />
                    3. Paste setup script into your terminal
                    <br />
                    5. Press enter key
                    <br />
                    4. Dance around and be happy
                <FilledInput underline style={{ width: '75%' }} value={`bash $(curl -fsSL http://quicky.dev/${sessionStorage.getItem('filePath')})`} />
                    <br /><br />
                </code>
            </pre>
        </div>
        
    </div>
    )
}

Download.propTypes = {
    classes: PropTypes.object.isRequired,
    filePath: PropTypes.string.isRequired,
  };

export default withStyles(styles)(Download)