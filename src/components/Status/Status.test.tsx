import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../setupTests';
import { Status } from './Status';

describe('Status component', () => {
  test('should render selected kid name when selectedKidId provided', async () => {
    renderWithProviders(<Status />, {
      preloadedState: { kids: { selectedKidId: '629cf0e0fd8f0f426c696b4e' } },
    });

    expect(await screen.findByText(/Active: Ethan/i)).toBeInTheDocument();
  });

  test('should render select a kid when no selectedKidId provided', async () => {
    renderWithProviders(<Status />, {
      preloadedState: {},
    });

    expect(
      await screen.findByText(/Active: Select a kid/i)
    ).toBeInTheDocument();
  });
});
