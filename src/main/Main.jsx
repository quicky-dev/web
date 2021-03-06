import Axios from 'axios';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import ItemSelection from '../components/itemselection/ItemSelection';
import { itemsBeenSet } from '../redux/actions/items';

const FormContainer = styled.div`
  background-color: #fff;
  min-width: 70vw;
  min-height: 70vh;
  padding: 4em;
  border-radius: 20px;
  -webkit-box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15),
    0 10px 10px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15),
    0 10px 10px rgba(0, 0, 0, 0.11);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.11);
  justify-content: space-around;
  display: flex;
  flex-direction: column;
`;

const WebApp = styled.div`
  background-color: #d3d3d3;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  text-align: center;
`;

const SectionHeading = styled.h1`
  font-size: 6em;
  margin: 0.15em 0;
`;

const SectionSubHeading = styled.h3`
  font-size: 1.5em;
  margin: 0 0;
`;

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

/**
 * @name Main
 * @description This shouldn't be named main
 * @class
 */
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
      const { dispatch, match } = this.props;
      const { os } = match.params;
      const res = await Axios.get(
        `${this.apiHost}/api/v1/os/${os}/availableItems`,
      );
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
      currentStep: currentStep + step,
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
    const { items, history, match } = this.props;
    const { os } = match.params;
    // posts items to api
    const res = await Axios.post(
      `${this.apiHost}/api/v1/os/${os}/dynamic`,
      items,
    );
    sessionStorage.setItem('filePath', `${os}/scripts/${res.data}`);
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
      currentStep,
      categories,
    } = this.state;
    if (isLoading === true) {
      return (
        <WebApp>
          <FormContainer>
            <Section>
              <SectionSubHeading>Loading...</SectionSubHeading>
            </Section>
          </FormContainer>
        </WebApp>
      );
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
      <WebApp>
        <FormContainer>
          <Section>
            <SectionHeading>{itemsObj.currentCategory}</SectionHeading>
            <SectionSubHeading>{itemsObj.currentDesc}</SectionSubHeading>
          </Section>
          <ItemSelection
            dispatch={dispatch}
            history={history}
            items={items}
            itemsObj={itemsObj}
            location={location}
            reset={reset}
            resetBoxes={this.resetBoxes}
            currentStep={currentStep}
          />
          {/* Stepper Component */}
          <div className={classes.root}>
            <Stepper nonLinear activeStep={currentStep}>
              {Object.keys(availableItems).map((label, index) => (
                <Step
                  key={label}
                  onClick={() => this.setState({
                    currentStep: index,
                    currentCategory: categories[index],
                  })}
                >
                  <StepButton
                    onClick={() => this.setState({ currentStep: index })}
                  >
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
                    onClick={() => this.submitForm()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FormContainer>
      </WebApp>
    );
  }
}

Main.defaultProps = {
  classes: {},
  items: { 'BROKEN-ITEMS': ['This', 'is', 'broken'] },
  history: {},
  location: {},
  match: {},
  dispatch: () => console.error('DISPATCH NOT PROPERLY SET'),
};

Main.propTypes = {
  /* eslint-disable */
  classes: PropTypes.object,
  items: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
  /* eslint-enable */
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default withStyles(styles)(connect(mapStateToProps)(Main));
