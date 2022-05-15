import { MouseEventHandler, ReactNode } from 'react';
import { monsters } from '../../utils/monsters';
import STYLES from './styles.module.css';
import cn from 'classnames';

interface Props {
  isActive: boolean;
  firstName: string;
  lastName: string;
  points: number;
  monster: number;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

export const Kid = (props: Props) => {
  return (
    <button
      onClick={props.onClickHandler}
      type="button"
      className={cn([STYLES.container, { [STYLES.active]: props.isActive }])}
    >
      {monsters[props.monster].component}
      <span className={STYLES.title}>
        {props.firstName} {props.lastName}
      </span>
      <span className={STYLES.points}>{props.points} Pts</span>
    </button>
  );
};
