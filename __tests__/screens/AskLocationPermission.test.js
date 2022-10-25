import { render, screen } from '../../utils/test.utils';

import AskLocationPermission from '../../screens/AskLocationPermission'

describe('AskLocationPermission', () => {
  
  test('renders correctly', () => {
    render(<AskLocationPermission />);
    console.log(screen.toJSON())
    // expect(screen.getByText('Please Enable Location')).toBeTruthy();
  });
});
