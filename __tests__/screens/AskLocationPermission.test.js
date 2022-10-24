import React from 'react';
import renderer from 'react-test-renderer';

import AskLocationPermission from '../../screens/AskLocationPermission'

describe('AskLocationPermission', () => {
  
  test('snapshot: renders correctly', () => {
    const tree = renderer.create(<AskLocationPermission />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
