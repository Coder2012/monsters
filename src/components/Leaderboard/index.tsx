import { useGetKidsQuery, useGetTasksQuery } from '../../features/api/apiSlice';
import { NavList } from '../Navigation';
import { Status } from '../Status';
import { TaskType } from '../Tasks/types';

import rank0 from '../../assets/icons/ranks/unranked.png';
import rank1 from '../../assets/icons/ranks/bronze1.png';
import rank2 from '../../assets/icons/ranks/bronze2.png';
import rank3 from '../../assets/icons/ranks/bronze3.png';
import rank4 from '../../assets/icons/ranks/silver1.png';
import rank5 from '../../assets/icons/ranks/silver2.png';
import rank6 from '../../assets/icons/ranks/silver3.png';
import rank7 from '../../assets/icons/ranks/gold1.png';
import rank8 from '../../assets/icons/ranks/gold2.png';
import rank9 from '../../assets/icons/ranks/gold3.png';
import rank10 from '../../assets/icons/ranks/plat1.png';
import rank11 from '../../assets/icons/ranks/plat2.png';
import rank12 from '../../assets/icons/ranks/plat3.png';
import rank13 from '../../assets/icons/ranks/diamond1.png';
import rank14 from '../../assets/icons/ranks/diamond2.png';
import rank15 from '../../assets/icons/ranks/diamond3.png';
import rank16 from '../../assets/icons/ranks/champion1.png';
import rank17 from '../../assets/icons/ranks/champion2.png';
import rank18 from '../../assets/icons/ranks/champion3.png';
import rank19 from '../../assets/icons/ranks/grand_champ1.png';
import rank20 from '../../assets/icons/ranks/grand_champ2.png';
import rank21 from '../../assets/icons/ranks/grand_champ3.png';
import rank22 from '../../assets/icons/ranks/ssl.png';

import STYLES from './styles.module.css';

const ranks = [
  rank0,
  rank1,
  rank2,
  rank3,
  rank4,
  rank5,
  rank6,
  rank7,
  rank8,
  rank9,
  rank10,
  rank11,
  rank12,
  rank13,
  rank14,
  rank15,
  rank16,
  rank17,
  rank18,
  rank19,
  rank20,
  rank21,
  rank22,
];

export const Leaderboard = () => {
  const {
    data: kids,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKidsQuery();

  const { data: tasks } = useGetTasksQuery();

  const getTaskById = (id: string) =>
    tasks?.find((task: TaskType) => task.id === id);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = kids?.map((kid: any) => (
      <section key={kid.id} className={STYLES.kid}>
        <h2 className={STYLES.heading}>
          <img
            src={
              ranks[Math.min((Math.ceil(kid.points / 10) * 10) / 10, 220 / 10)]
            }
            alt="rank"
          />
          {kid.firstName} {kid.lastName}
        </h2>
        <ul className={STYLES.list}>
          {kid.taskList
            //@ts-expect-error
            .reduce((acc, curr) => {
              const item: any = acc.find((item: any) => item.id === curr);
              if (item) {
                item.count++;
              } else {
                acc.push({ id: curr, count: 1 });
              }
              return acc;
            }, [])
            .map((task: any, index: number) => {
              const t = getTaskById(task.id);
              return (
                <li key={`${index}_${task}`}>
                  <span className={STYLES.highlight}>{task.count}x </span> -{' '}
                  {t?.title} = {t?.points * task.count}
                </li>
              );
            })}
        </ul>
        <p className={STYLES.total}>Total: {kid.points}</p>
      </section>
    ));
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return (
    <section>
      <header className="App-header">
        <h1>Monsters Rewards!</h1>
        <Status />
      </header>
      <NavList />
      <section className={STYLES.container}>{content}</section>
    </section>
  );
};
