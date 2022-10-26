import * as React from 'react';
import { render, screen } from 'test.utils';

import FormInput from '../../components/FormInput'

describe('FormInput', () => {

  test('renders correctly', () => {
    render(<FormInput />);
    // console.log(screen.toJSON());
  });
  
});