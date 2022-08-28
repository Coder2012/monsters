import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../setupTests';
import { NavList } from './NavList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useLocation: jest.fn(),
}));

describe('NavList', () => {
  it.only('should render navigation', () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/kids/']}>
        <NavList />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
