import React from "react";
import "./Download.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FilledInput } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function Download(props) {
  return (
    <div className="dl-page">
      <div className="Instructions">
        <h1>Well, that was quick!</h1>
        <p>
          Copy and run the following bash script to set up your dev environment
        </p>
        <code>
          <FilledInput
            underline
            value={`bash <(curl -s https://quicky-api.herokuapp.com/api/scripts/${sessionStorage.getItem(
              "filePath"
            )})`}
          />
        </code>
      </div>
    </div>
  );
}

Download.propTypes = {
  classes: PropTypes.object.isRequired,
  filePath: PropTypes.string.isRequired
};

export default withStyles(styles)(Download);
