import { useForm, SubmitHandler } from 'react-hook-form';
import STYLES from '../common/styles.module.css';

import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetKidsQuery,
  useGetTasksQuery,
  useUpdateKidMutation,
} from '../../features/api/apiSlice';
import { NavList } from '../Navigation';
import { Task } from './Task';
import { Status } from '../Status';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedKidId, selectKid } from '../Kids/kidSlice';
import { KidType } from '../Kids/types';
import { TaskType } from './types';
import { getSelectedTaskId, selectTask } from './taskSlice';
import { useEffect } from 'react';

export const Tasks = () => {
  const dispatch = useDispatch();
  const selectedKidId = useSelector(getSelectedKidId);
  const selectedTaskId = useSelector(getSelectedTaskId);

  const { selectedKid } = useGetKidsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedKid: data?.find((kid: KidType) => kid.id === selectedKidId),
    }),
  });

  const { selectedTask } = useGetTasksQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedTask: data?.find((task: TaskType) => task.id === selectedTaskId),
    }),
  });

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

  const { register, handleSubmit } = useForm<Inputs>();

  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateKid] = useUpdateKidMutation();

  useEffect(() => {
    if (selectedKidId && selectedTask) {
      console.log('now I will update the kid', selectedTask?.id);
      const points = selectedKid?.points + selectedTask?.points;
      const taskList = [...(selectedKid?.taskList || []), selectedTaskId];

      updateKid({
        id: selectedKidId,
        body: { points, taskList: JSON.stringify(taskList) },
      });

      dispatch(selectKid(null));
      dispatch(selectTask(null));
    }
  }, [
    dispatch,
    selectedKidId,
    selectedTask,
    selectedKid?.points,
    selectedKid?.taskList,
  ]);

  const onSubmit: SubmitHandler<Inputs> = data => {
    try {
      console.log('adding task', data);
      addTask(data);
    } catch (err) {
      console.error('Failed to save the task: ', err);
    }
  };

  const onDeleteClicked = async (id: string) => {
    console.log(id);
    deleteTask(id);
  };

  const onTaskSelected = (id: string) => {
    dispatch(selectTask(id));
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = tasks.map((task: any) => (
      <Task
        key={task.id}
        title={task.title}
        points={task.points}
        onDeleteHandler={
          selectedKidId === null ? () => onDeleteClicked(task.id) : null
        }
        onTaskHandler={
          selectedKidId !== null ? () => onTaskSelected(task.id) : null
        }
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <header className="App-header">
        <h1>Tasks</h1>
        <Status />
      </header>
      <NavList />
      {selectedKidId ? (
        <p className={STYLES.heading}>
          Add a task for {selectedKid?.firstName}
        </p>
      ) : (
        <p className={STYLES.heading}>Manage your tasks</p>
      )}
      <section className={STYLES.content}>{content}</section>
      {selectedKidId === null && (
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
      )}
    </section>
  );
};
