import { MemoryRouter } from 'react-router-dom';
import { renderWithProvider } from '../../setupTests';
import { NavList } from './NavList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useLocation: jest.fn(),
}));

describe('NavList', () => {
  it('should render navigation', () => {
    const { container } = renderWithProvider(
      <MemoryRouter initialEntries={['/kids/']}>
        <NavList />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
