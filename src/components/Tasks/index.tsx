import { useForm, SubmitHandler } from 'react-hook-form';
import STYLES from '../common/styles.module.css';

import {
  useAddTaskMutation,
  useGetTasksQuery,
} from '../../features/api/apiSlice';
import { NavList } from '../Navigation';
import { Task } from './Task';

export const Tasks = () => {
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();

  type Inputs = {
    title: string;
    points: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addTask] = useAddTaskMutation();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      console.log('adding task', data);
      await addTask(data);
    } catch (err) {
      console.error('Failed to save the task: ', err);
    }
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = tasks.map((task: any) => (
      <Task key={task.id} title={task.title} points={task.points} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <header className="App-header">
        <h1>Tasks</h1>
      </header>
      <NavList />
      <section className={STYLES.content}>{content}</section>
      <section className={STYLES.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <legend>Add a task</legend>
          <input
            {...register('title', { required: 'Enter task title' })}
            placeholder="title"
          />
          <input
            {...register('points', {
              valueAsNumber: true,
              required: 'Enter points for task',
            })}
            placeholder="points"
          />
          <input className={STYLES.button} type="submit" value="Add" />
        </form>
      </section>
    </section>
  );
};
