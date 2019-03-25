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
        </div>
        <div className="Instructions">
            <pre>
                <code>
                    // Installation Instructions
                    <br /><br />
                    1. Copy the command at the bottom
                    <br /><br />
                    2. Open your terminal, paste in the command, and run.
                    <br /><br />
                    3. If you have xcode, you will be prompted to install the xcode CLI tools. This will open an xcode 
                    <br />GUI that you should wait for to finish all while the next stage is prepped. 
                    <br /><br />
                    4. When the GUI installer is finished, press enter in the terminal to resume the installation
                    <br /><br />
                    5. Dance around and be happy! You may be prompted for a password a couple of times 
                    <br />depending on what it is you chose to install, but other than that there is no
                    <br />nothing else required on your part. You can run apps as soon as they're installed
                    <br /><br />
                    <FilledInput underline style={{ width: '75%' }} value={`bash <(curl -s https://quicky-api.herokuapp.com/api/scripts/${sessionStorage.getItem('filePath')})`} />
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
