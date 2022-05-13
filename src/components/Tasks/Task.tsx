import STYLES from './styles.module.css';

interface Props {
  title: string;
  points: number;
}

export const Task = (props: Props) => {
  return (
    <div className={STYLES.container}>
      <span className={STYLES.title}>{props.title}</span>
      <span className={STYLES.points}>{props.points} Pts</span>
    </div>
  );
};
