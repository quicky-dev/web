import React, { PureComponent } from 'react';
import styled from 'styled-components';
import osx from '../../assets/apple-icon.svg';
import linux from '../../assets/linux-icon.svg';

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
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const SystemPage = styled.div`
  background-color: #d3d3d3;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 6em;
  margin: 0.15em 0;
`;

const Options = styled.div``;

const OSX = styled.img`
  height: 100px;
`;

const LINUX = styled.img`
  height: 100px;
`;

const SystemOption = styled.a`
  border-radius: 5px;
  border: 2px solid #333;
`;

export default class SystemSelect extends PureComponent {
  render() {
    return (
      <SystemPage>
        <FormContainer>
          <Heading>Operating Systems</Heading>
          <Options>
            <SystemOption href="/form/macos">
              <OSX src={osx} alt="ubuntu" />
            </SystemOption>
            <SystemOption href="/form/ubuntu">
              <LINUX src={linux} alt="ubuntu" />
            </SystemOption>
          </Options>
        </FormContainer>
      </SystemPage>
    );
  }
}
