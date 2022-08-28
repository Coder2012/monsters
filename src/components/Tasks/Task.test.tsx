import { screen, fireEvent } from '@testing-library/react';
import { MouseEventHandler } from 'react';
import { renderWithProvider } from '../../setupTests';
import { Task } from './Task';

interface Props {
  isAdmin: boolean;
  isSelected: boolean;
  title: string;
  points: number;
  onDeleteHandler: MouseEventHandler<HTMLButtonElement> | null;
  onTaskHandler: MouseEventHandler<HTMLButtonElement> | null;
}

const PROPS = {
  isAdmin: false,
  isSelected: false,
  title: 'Karate',
  points: 10,
  onDeleteHandler: null,
  onTaskHandler: jest.fn(),
};
describe('Task component', () => {
  it('should render task with title and points', () => {
    renderWithProvider(<Task {...PROPS} />);

    expect(screen.getByText(/Karate/i)).toBeVisible();
  });

  it('should call onTaskHandler when clicked', () => {
    renderWithProvider(<Task {...PROPS} />);

    fireEvent.click(screen.getByTestId('task-button'));

    expect(PROPS.onTaskHandler).toHaveBeenCalledTimes(1);
  });

  it('should not render delete button', () => {
    renderWithProvider(<Task {...PROPS} />);

    expect(screen.queryByTestId('task-delete-button')).not.toBeInTheDocument();
  });

  describe('admin mode', () => {
    it('should call onDeleteHandler when button clicked', () => {
      const propsWithAdmin = {
        ...PROPS,
        isAdmin: true,
        onDeleteHandler: jest.fn(),
      };
      renderWithProvider(<Task {...propsWithAdmin} />);

      fireEvent.click(screen.getByTestId('task-delete-button'));

      expect(propsWithAdmin.onDeleteHandler).toHaveBeenCalledTimes(1);
    });
  });
});
