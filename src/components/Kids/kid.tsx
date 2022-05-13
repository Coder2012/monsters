import { ReactNode } from 'react';
import { monsters } from '../../utils/monsters';
import STYLES from './styles.module.css';

interface Props {
  firstName: string;
  lastName: string;
  points: number;
  monster: number;
}

export const Kid = (props: Props) => {
  return (
    <div className={STYLES.container}>
      {monsters[props.monster].component}
      <span className={STYLES.title}>
        {props.firstName} {props.lastName}
      </span>
      <span className={STYLES.points}>{props.points} Pts</span>
    </div>
  );
};
