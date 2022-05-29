/**
 * @format
 */
import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import FlexibleContent from '../../components/FlexibleContent';

import { render } from '@testing-library/react-native';

test('renders with height 100 when isPortal is true', () => {
  const { getByText, debug } = render(<FlexibleContent
    style={{
      backgroundColor: '#EFEFEF',
      padding: 0,
      height:'auto'
      }
    }
    isPortal={true}  
    >
      <Text>Lorem</Text>
    </FlexibleContent>
  );
  debug('print FlexibleContent component');
  const element = getByText('Lorem');
  expect(element.parent.props.height).toEqual(100);
});

test('renders with height auto when isPortal is falsey', () => {
  const { getByText, debug } = render(<FlexibleContent
    style={{
      backgroundColor: '#EFEFEF',
      padding: 0,
      height:'auto'
      }
    }
    >
      <Text>Lorem</Text>
    </FlexibleContent>
  );
  debug('print FlexibleContent component');
  const element = getByText('Lorem');
  expect(element.parent.props.height).toEqual("auto");
});
