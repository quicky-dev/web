import React, { PureComponent } from 'react';
import './Download.css';
import { withStyles } from '@material-ui/core/styles';
import { FilledInput } from '@material-ui/core';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Download extends PureComponent {
  render() {
    const curlCmd = 'bash <curl -s https://api.quicky.dev/api/scripts/';
    const scriptLocation = `${sessionStorage.getItem('filePath')}`;
    return (
      <div className="dl-page">
        <div className="Instructions">
          <h1>Well, that was quick!</h1>
          <p>
            Copy and run the following bash script to set up your dev
            environment
          </p>
          <code>
            <FilledInput underline value={curlCmd + scriptLocation} />
          </code>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Download);
