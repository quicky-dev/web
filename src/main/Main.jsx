import Axios from 'axios';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import './Main.css';
import ItemSelection from '../components/itemselection/ItemSelection';
import { itemsBeenSet } from '../redux/actions/items';

// Stepper Styling
const styles = (theme) => ({
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      availableItems: {},
      currentCategory: '',
      completed: {},
      isLoading: true,
    };
    this.submitForm = this.submitForm.bind(this);
    this.setupItems = this.setupItems.bind(this);
    this.apiHost = process.env.REACT_APP_DEVELOPMENT_MODE
      ? ''
      : 'https://api.quicky.dev';
  }

  async componentDidMount() {
    await this.setupItems();
  }

  setupItems = async () => {
    try {
      const { dispatch } = this.props;
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
        isLoading: false,
      });

      dispatch(itemsBeenSet(items));
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  };

  handleStep = (step) => {
    const { currentStep, categories } = this.state;
    if (currentStep + step < 0 || currentStep + step >= categories.length) {
      return;
    }

    this.setState({
      step: currentStep + step,
      currentCategory: categories[currentStep + step],
    });
  };

  handleReset = async () => {
    try {
      // currently this will reset the checkboxes
      // this is hacky implementation and needs to be updatted
      window.location.reload();
      // resetup all the items(clears the items store)
      await this.setupItems();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('There was an error resetting the form: ', err);
    }
  };

  // sends global items store to api to genearte script
  submitForm = async () => {
    const { items, history } = this.props;
    // posts items to api
    const res = await Axios.post(`${this.apiHost}/api/dynamic`, items);
    sessionStorage.setItem('filePath', res.data);
    history.push('/setup');
  };

  completedSteps() {
    const { completed } = this.state;
    return Object.keys(completed).length;
  }

  isLastStep() {
    const { currentStep, availableItems } = this.state;
    return currentStep === availableItems.length - 1;
  }

  allStepsCompleted() {
    const { availableItems } = this.state;
    return this.completedSteps() === availableItems.length;
  }

  render() {
    const {
      isLoading,
      availableItems,
      currentCategory,
      reset,
      step,
      categories,
    } = this.state;
    if (isLoading === true) {
      return <h1>Loading</h1>;
    }

    const {
      classes, history, location, items, dispatch,
    } = this.props;
    const itemsObj = {
      currentCategory,
      currentDesc: availableItems[currentCategory].Description,
      currentItems: availableItems[currentCategory].Items,
    };

    return (
      <div className="main">
        <h1>{itemsObj.currentCategory}</h1>
        <h3>{itemsObj.currentDesc}</h3>
        <ItemSelection
          itemsObj={itemsObj}
          resetBoxes={this.resetBoxes}
          history={history}
          location={location}
          items={items}
          dispatch={dispatch}
          reset={reset}
        />
        {/* Stepper Component */}
        <div className={classes.root}>
          <Stepper nonLinear activeStep={step}>
            {Object.keys(availableItems).map((label, index) => (
              <Step
                key={label}
                onClick={() => this.setState({
                  step: index,
                  currentCategory: categories[index],
                })}
              >
                <StepButton onClick={() => this.setState({ step: index })}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
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
                  className={classes.button}
                  onClick={() => this.handleReset()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.defaultProps = {
  classes: {},
  items: { 'BROKEN-ITEMS': ['This', 'is', 'broken'] },
  history: {},
  location: {},
  dispatch: () => console.error('DISPATCH NOT PROPERLY SET'),
};

Main.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object),
  items: PropTypes.objectof(PropTypes.object),
  history: PropTypes.objectof(PropTypes.object),
  location: PropTypes.objectof(PropTypes.object),
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default withStyles(styles)(connect(mapStateToProps)(Main));
