import { render, screen } from '@testing-library/react';
import App from './App';

test('renders EzDiff heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/EzDiff/i);
  expect(headingElement).toBeInTheDocument();
});
