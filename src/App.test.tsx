import { screen } from '@testing-library/react';
import { renderWithProviders } from './setupTests';
import App from './App';

test('renders app title', () => {
  renderWithProviders(<App />);

  expect(screen.getByText(/Monsters!/i)).toBeInTheDocument();
});
