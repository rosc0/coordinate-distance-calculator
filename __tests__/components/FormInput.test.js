import { render, screen } from '../../utils/test.utils';

import FormInput from '../../components/FormInput'

describe('FormInput', () => {
  
  test('renders correctly', () => {
    render(<FormInput />);
    console.log(screen.toJSON());
  });
});