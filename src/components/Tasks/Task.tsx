import { MouseEventHandler } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';
import STYLES from './styles.module.css';

interface Props {
  isAdmin: boolean;
  isSelected: boolean;
  title: string;
  points: number;
  onDeleteHandler: MouseEventHandler<HTMLButtonElement> | null;
  onTaskHandler: MouseEventHandler<HTMLButtonElement> | null;
}

export const Task = ({
  isAdmin = false,
  isSelected = false,
  title,
  points,
  onDeleteHandler,
  onTaskHandler,
}: Props) => {
  const TaskContent = () => {
    return (
      <>
        <span className={STYLES.title}>{title}</span>
        <span className={STYLES.points}>{points} Pts</span>
      </>
    );
  };
  return (
    <div className={STYLES.container}>
      {isAdmin && onDeleteHandler && (
        <button
          data-testid="task-delete-button"
          type="button"
          className={STYLES.deleteButton}
          onClick={onDeleteHandler}
        >
          <DeleteIcon className={STYLES.delete} />
        </button>
      )}
      {onTaskHandler !== null ? (
        <>
          {isSelected && <TickIcon className={STYLES.tick} />}
          <button
            data-testid="task-button"
            onClick={onTaskHandler}
            type="button"
            className={STYLES.taskButton}
          >
            {<TaskContent />}
          </button>
        </>
      ) : (
        <div className={STYLES.taskContent}>{<TaskContent />}</div>
      )}
    </div>
  );
};
