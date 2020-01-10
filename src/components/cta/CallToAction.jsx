import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
  background-color: #fa983a;
  text-decoration: none;
  align-self: flex-start;
  font-size: 1.25em;
  border-radius: 5px;
  padding: 12px 12px;
  color: #fff;
  margin: 1.5em 0;
  
  &:hover { color: #fff; }

`;

class CallToAction extends PureComponent {
  render() {
    const { endpoint, label } = this.props;
    return (
      <StyledLink to={endpoint}>{label}</StyledLink>
    );
  }
}

CallToAction.defaultProps = {
  endpoint: 'INVALID ENDPOINT',
  label: 'BROKEN LABEL'
};

CallToAction.propTypes = {
  /* eslint-disable */
  endpoint: PropTypes.string,
  label: PropTypes.string
  /* eslint-enable */
};

export default CallToAction;
