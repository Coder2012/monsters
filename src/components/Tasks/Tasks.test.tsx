import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { renderWithProvider } from '../../setupTests';
import { Tasks } from './Tasks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useParams: jest.fn(),
}));

describe('Tasls component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render list of tasks', async () => {
    // @ts-expect-error
    useParams.mockReturnValue({
      admin: undefined,
    });

    renderWithProvider(
      <MemoryRouter initialEntries={['/Tasks']}>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Manage your tasks/)).toBeVisible();
    expect(await screen.findByText(/Piano/)).toBeVisible();
    expect(await screen.findByText(/Tuition/)).toBeVisible();
    expect(await screen.findByText(/Make your bed/)).toBeVisible();
  });

  test('should not render add task form when admin is undefined', async () => {
    // @ts-expect-error
    useParams.mockReturnValue({
      admin: undefined,
    });

    renderWithProvider(
      <MemoryRouter initialEntries={['/tasks/admin']}>
        <Routes>
          <Route path="/tasks/:admin" element={<Tasks />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByText(/Add a new task/i)).not.toBeInTheDocument();
  });

  test('should render add task form when admin is provided', async () => {
    // @ts-expect-error
    useParams.mockReturnValue({
      admin: 'admin',
    });

    renderWithProvider(
      <MemoryRouter initialEntries={['/tasks/admin']}>
        <Routes>
          <Route path="/tasks/:admin" element={<Tasks />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByText(/Add a task/i)).toBeInTheDocument();
  });
});
