import { screen } from '@testing-library/react';
import { renderWithProvider } from './setupTests';
import App from './App';

test('renders app title', () => {
  renderWithProvider(<App />);

  expect(screen.getByText(/Monsters!/i)).toBeInTheDocument();
});
