import React from 'react';
import './Main.css'
import { Link } from "react-router-dom";
// Horizontal Linear Stepper
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Form from '../form/Form';
import Typography from '@material-ui/core/Typography';


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
    return ['Terminal/Shell', 'IDE/Editor', 'Language', 'Dev Tools'];
}

function getStepContent(step) {
    switch (step) {
        default:
            return 'Terminal/Shell';
        case 1:
            return 'IDE/Editor';
        case 2:
            return 'Language';
        case 3  :
            return 'Dev Tools';
    }
}

class Main extends React.Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      installRequest: {
        'shells': [],
        'terminals': [],
        'editors': [],
        'languages': [],
        'tools': [],
      },
      completed: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
    };
  }

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
    const { step } = this.props;

    completed[step] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
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
      const { classes, step } = this.props;
      const steps = getSteps();
      const nextStep = `/form/${parseInt(step, 10) + 1}`;
      const prevStep = `/form/${step - 1}`;
    
      return (
        <div className="main">

        <Form step={step} />
        {/* Stepper Component */}
        <div className={classes.root}>
        <Stepper nonLinear activeStep={step}>
          {steps.map((label, index) => (
            <Step key={label}>
              <Link to={`/form/${index +  1}`} style={{ textDecoration: 'none' }}>
                <StepButton>
                  {label}
                </StepButton>
              </Link>
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
              <Typography className={classes.instructions}>{getStepContent(step)}</Typography>
              <div>
                <Link to={prevStep}>
                  <Button className={classes.button}>
                    Back
                  </Button>
                </Link>
                <Link to={nextStep}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Next
                  </Button>
                </Link>
                {step !== steps.length &&
                  (this.state.completed[step] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step { step } already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
        </div>
      );
    }
  }

Main.propTypes = {
    classes: PropTypes.object,
  };
  

export default withStyles(styles)(Main);
