import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Header component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Header/i); // Adjust based on actual text in Header
  expect(headerElement).toBeInTheDocument();
});

test('renders Footer component', () => {
  render(<App />);
  const footerElement = screen.getByText(/Footer/i); // Adjust based on actual text in Footer
  expect(footerElement).toBeInTheDocument();
});
