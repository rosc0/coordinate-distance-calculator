import React from 'react';
import renderer from 'react-test-renderer';

import CoordDistanceForm from '../../screens/CoordDistanceForm'

describe('CoordDistanceForm', () => {

  test('snapshot: renders correctly', () => {
    const tree = renderer.create(<CoordDistanceForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});