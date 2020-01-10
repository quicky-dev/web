import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CTA from '../../components/cta/CallToAction';
import Navbar from '../../components/navbar/Navbar';

const Page = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 10em;
`;

const Heading = styled.h1`
  font-size: 5em;
  max-width: 642px;
  letter-spacing: 2px;
  line-height: 1.2em;
  margin: 0.25em 0;
`;

const Subheading = styled.p`
  font-size: 1.75em;
  max-width: 750px;
  letter-spacing: 1px;
  line-height: 1.2em;
  margin-block-start: 0.35em;
  margin-block-end: 0.35em;
`;

class Landing extends PureComponent {
  render() {
    return (
      <Page>
        <Navbar />
        {/* TODO: create and insert navbar component */}
        <Content>
          <Heading>Get developing in no time!</Heading>
          <Subheading>
            Fresh install? New computer? Quicky sets up your developer
            environment with just a few clicks.
          </Subheading>
          <CTA endpoint="/os" label="Get Started" />
        </Content>
      </Page>
    );
  }
}

export default Landing;
