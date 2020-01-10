import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Clipboard from 'react-clipboard.js';

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

const DownloadPage = styled.div`
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

const Subheading = styled.h3`
  font-size: 1.5em;
  margin-bottom: 2em;
`;

const CopySection = styled.div``;

const Script = styled.input`
  width: 50%;
`;

const CopyBtn = styled(Clipboard)``;

class Download extends PureComponent {
  render() {
    const curlCmd = 'bash <curl -s https://api.quicky.dev/api/v1/os/';
    const scriptLocation = `${sessionStorage.getItem('filePath')}`;
    return (
      <DownloadPage>
        <FormContainer>
          <Heading>Well, that was quick!</Heading>
          <Subheading>
            Copy and run the following bash script to set up your dev
            environment
          </Subheading>
          <CopySection>
            <Script value={curlCmd + scriptLocation} />
            <CopyBtn data-clipboard-text={curlCmd + scriptLocation}>
              copy
            </CopyBtn>
          </CopySection>
        </FormContainer>
      </DownloadPage>
    );
  }
}

export default Download;
