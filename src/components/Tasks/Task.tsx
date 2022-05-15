import { MouseEventHandler } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import STYLES from './styles.module.css';

interface Props {
  title: string;
  points: number;
  onDeleteHandler: MouseEventHandler<HTMLButtonElement> | null;
  onTaskHandler: MouseEventHandler<HTMLButtonElement> | null;
}

export const Task = (props: Props) => {
  const TaskContent = () => {
    return (
      <>
        <span className={STYLES.title}>{props.title}</span>
        <span className={STYLES.points}>{props.points} Pts</span>
      </>
    );
  };
  return (
    <div className={STYLES.container}>
      {props.onDeleteHandler && (
        <button
          type="button"
          className={STYLES.deleteButton}
          onClick={props.onDeleteHandler}
        >
          <DeleteIcon className={STYLES.delete} />
        </button>
      )}
      {props.onTaskHandler !== null ? (
        <button
          onClick={props.onTaskHandler}
          type="button"
          className={STYLES.taskButton}
        >
          {<TaskContent />}
        </button>
      ) : (
        <div className={STYLES.taskContent}>{<TaskContent />}</div>
      )}
    </div>
  );
};
