import { render, screen } from 'test.utils';

import CoordDistanceForm from '../../screens/CoordDistanceForm'

describe('CoordDistanceForm', () => {

  test('renders correctly', () => {
    render(<CoordDistanceForm />);
    console.log(screen.toJSON());
    expect(screen.getByText('Submit')).toBeTruthy();
  });
  
});