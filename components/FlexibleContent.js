import React from 'react';
import {
  KeyboardAvoidingView,
} from 'react-native';

import styled from 'styled-components/native';

const OFFSET = 0;

const FlexibleContentView = styled.View`
  height: ${OFFSET}px;
  top:  ${OFFSET}px;
  position: relative;
  overflow: hidden;
  flex: 1;
`;

class FlexibleContent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  // *NOTE* the height parameter below is a bug
  render() {
    console.log(this.props.isPortal);
    console.log(this.props.height);
    return (
      <FlexibleContentView
        style={this.props.style || {}}
      >
        <React.Fragment>
          <KeyboardAvoidingView
          behavior="padding"
          height={this.props.isPortal ? '100px' : 'auto'}
          >
            {this.props.children}
          </KeyboardAvoidingView>
        </React.Fragment>
      </FlexibleContentView>
    );
  }
}

export default FlexibleContent;