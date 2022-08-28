import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { renderWithProvider } from '../../setupTests';
import { Kids } from './Kids';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useParams: jest.fn(),
}));

describe('Kids component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render list of kids', async () => {
    // @ts-expect-error
    useParams.mockReturnValue({
      admin: undefined,
    });

    renderWithProvider(
      <MemoryRouter initialEntries={['/kids/admin']}>
        <Routes>
          <Route path="/kids/:admin" element={<Kids />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/HYPNOTIC/)).toBeVisible();
    expect(await screen.findByText(/Ethan Brown/i)).toBeVisible();
    expect(document.querySelector('[class*="points"]')).toHaveTextContent(
      '30 Pts'
    );

    expect(await screen.findByText(/DANGER/)).toBeVisible();
    expect(await screen.findByText(/Isaac Brown/i)).toBeVisible();
    expect(document.querySelector('[class*="points"]')).toHaveTextContent(
      '0 Pts'
    );
  });

  test('should note render reset button and add kid form when admin is undefined', async () => {
    // @ts-expect-error
    useParams.mockReturnValue({
      admin: undefined,
    });

    renderWithProvider(
      <MemoryRouter initialEntries={['/kids/admin']}>
        <Routes>
          <Route path="/kids/:admin" element={<Kids />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByText(/Reset/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Add a new kid/i)).not.toBeInTheDocument();
  });

  test('should render reset button and add kid form when admin is admin', async () => {
    // @ts-expect-error
    useParams.mockReturnValue({
      admin: 'admin',
    });

    renderWithProvider(
      <MemoryRouter initialEntries={['/kids/admin']}>
        <Routes>
          <Route path="/kids/:admin" element={<Kids />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Reset/i)).toBeVisible();
    expect(await screen.findByText(/Add a new kid/i)).toBeVisible();
  });
});
