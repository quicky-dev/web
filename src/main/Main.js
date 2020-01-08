import React from "react";
//import Download from '../download/Download';
import Form from "../pages/form/Form";
import "./Main.css";
// Horizontal Linear Stepper
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { itemsBeenSet } from "../actions/items";
import { connect } from "react-redux";
import Axios from "axios";

// Stepper Styling
const styles = theme => ({
  root: {
    width: "95%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class Main extends React.Component {
  static propTypes = {
    step: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      availableItems: {},
      currentCategory: "",
      completed: {},
      isLoading: true
    };
    this.submitForm = this.submitForm.bind(this);
    this.setupItems = this.setupItems.bind(this);
    this.apiHost = process.env.REACT_APP_DEVELOPMENT_MODE
      ? ""
      : "https://api.quicky.dev";
    console.log(process.env.REACT_APP_DEVELOPMENT_MODE);
  }

  async componentDidMount() {
    await this.setupItems();
  }

  setupItems = async () => {
    try {
      const res = await Axios.get(`${this.apiHost}/api/availableItems`);
      const availableItems = res.data;

      const categories = Object.keys(availableItems);

      const items = {};
      const completed = {};
      for (let i = 0; i < categories.length; i += 1) {
        items[categories[i]] = [];
        completed[i] = false;
      }

      const currentCategory = categories[0];

      await this.setState({
        availableItems,
        categories,
        currentCategory,
        completed,
        isLoading: false
      });

      this.props.dispatch(itemsBeenSet(items));
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  };

  handleStep = step => {
    if (
      this.state.step + step < 0 ||
      this.state.step + step >= this.state.categories.length
    ) {
      return;
    }
    this.setState({
      step: this.state.step + step,
      currentCategory: this.state.categories[this.state.step + step]
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    const { step } = this.props;

    completed[step] = true;
    this.setState({
      completed
    });
    this.handleNext();
  };

  // when form is reset, resets the global items property and unchecks all checkboxes
  handleReset = async () => {
    try {
      // currently this will reset the checkboxes
      // this is hacky implementation and needs to be updatted
      window.location.reload();
      // resetup all the items(clears the items store)
      await this.setupItems();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("There was an error resetting the form: ", err);
    }
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.state.vailableItems.length - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.state.availableItems.length;
  }

  // sends global items store to api to genearte script
  submitForm = async () => {
    const { items, history } = this.props;
    // posts items to api
    const res = await Axios.post(`${this.apiHost}/api/dynamic`, items);
    const filePath = res.data;
    console.log("about to redirect");
    sessionStorage.setItem("filePath", filePath);
    history.push("/setup");
  };

  render() {
    if (this.state.isLoading === true) {
      return <h1>Loading</h1>;
    }

    const { classes, step } = this.props;
    const steps = this.state.availableItems.length;
    const availableItems = this.state.availableItems;
    const itemsObj = {
      currentCategory: this.state.currentCategory,
      currentDesc: availableItems[this.state.currentCategory].Description,
      currentItems: availableItems[this.state.currentCategory].Items
    };

    return (
      <div className="main">
        <Form
          itemsObj={itemsObj}
          resetBoxes={this.resetBoxes}
          {...this.props}
          reset={this.state.reset}
        />
        {/* Stepper Component */}
        <div className={classes.root}>
          <Stepper nonLinear activeStep={this.state.step}>
            {Object.keys(this.state.availableItems).map((label, index) => (
              <Step
                key={label}
                onClick={() =>
                  this.setState({
                    step: index,
                    currentCategory: this.state.categories[index]
                  })
                }
              >
                <StepButton onClick={() => this.setState({ step: index })}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <div>
                  <Button
                    className={classes.button}
                    onClick={() => this.handleStep(-1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.handleStep(1)}
                  >
                    Next
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.handleReset()}
                  >
                    Reset
                  </Button>
                  {step !== steps &&
                    (this.state.completed[step] ? (
                      <Typography
                        variant="caption"
                        className={classes.completed}
                      >
                        Step {step} already completed
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleComplete}
                      >
                        {this.completedSteps() === steps - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </div>
              </div>
            )}
            {this.state.step ===
            Object.keys(this.state.availableItems).length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.submitForm()}
              >
                Submit
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Main));
