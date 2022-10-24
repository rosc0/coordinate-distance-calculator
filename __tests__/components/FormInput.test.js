import React from 'react';
import renderer from 'react-test-renderer';

import FormInput from '../../components/FormInput'

describe('FormInput', () => {
  
  test('snapshot: renders correctly', () => {
    const tree = renderer.create(<FormInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});