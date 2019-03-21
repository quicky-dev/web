import React, { Component } from 'react';
// Components
import Landing from '../landing/Landing';
import Download from '../download/Download';
import Form from '../form/Form';
// CSS 
import './Main.css'
// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Horizontal Linear Stepper
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// React Router --> Functions for Each Page
function LandingPage() {
    
}

function TermShellPage() {

}

function EditorPage() {

}

function LanguagePage() {

}

function ToolDbPage() {

}

function DownloadPage() {

}

// Stepper Styling
const styles = theme => ({
  root: {
    width: '95%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
    return ['Terminal/Shell', 'IDE/Editor', 'Languages', 'Tools/Databases'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Terminal/Shell';
        case 1:
            return 'IDE/Editor';
        case 2:
            return 'Languages';
        case 3  :
            return 'Tools/Databases';
    }
}

class Main extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
  }; 

  totalSteps = () => getSteps().length;

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }
  
    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;
  
      return (
        <Router>
          <div className="main">
            {/* Routes w/ their Components */}
            <Route path="/" exact component={Landing} />
            <Route path="/form" exact component={Form} />
            <Route path="/form/download" exact component={Download} />
      
            {/* Stepper Component */}
            <div className={classes.root}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={this.handleStep(index)}
                      completed={this.state.completed[index]}
                    >
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
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (this.state.completed[this.state.activeStep] ? (
                          <Typography variant="caption" className={classes.completed}>
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleComplete}
                          >
                            {this.completedSteps() === this.totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Router>
      );      
    }
  }

Main.propTypes = {
    classes: PropTypes.object,
  };
  

export default withStyles(styles)(Main);