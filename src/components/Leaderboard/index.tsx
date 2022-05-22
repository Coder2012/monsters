import { useGetKidsQuery, useGetTasksQuery } from '../../features/api/apiSlice';
import { NavList } from '../Navigation';
import { Status } from '../Status';
import { TaskType } from '../Tasks/types';

import STYLES from './styles.module.css';

export const Leaderboard = () => {
  const {
    data: kids,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKidsQuery();

  const { data: tasks } = useGetTasksQuery();

  const getTaskById = (id: string) => {
    return tasks?.find((task: TaskType) => task.id == id);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = kids?.map((kid: any) => (
      <section key={kid.id} className={STYLES.kid}>
        <h2 className={STYLES.heading}>
          {kid.firstName} {kid.lastName}
        </h2>
        <ul className={STYLES.list}>
          {kid.taskList.map((task: any, index: number) => {
            const t = getTaskById(task);
            return (
              <li key={`${index}_${task}`}>
                <span className={STYLES.highlight}>{t?.points}</span> -{' '}
                {t?.title}
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
