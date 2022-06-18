import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

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
import { getSelectedKidId, selectKid } from '../Kids/kidSlice';
import { KidType } from '../Kids/types';
import { TaskType } from './types';
import {
  getSelectedTasks,
  addSelectedTasks,
  clearSelectedTasks,
  removeSelectedTasks,
} from './taskSlice';

import STYLES from '../common/styles.module.css';

export const Tasks = () => {
  const { admin } = useParams();
  const isAdmin = admin === 'admin';
  const dispatch = useDispatch();
  const selectedKidId = useSelector(getSelectedKidId);
  const selectedTaskIds = useSelector(getSelectedTasks);

  const { selectedKid } = useGetKidsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedKid: data?.find((kid: KidType) => kid.id === selectedKidId),
    }),
  });

  const { selectedTasks } = useGetTasksQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedTasks: data?.reduce((acc: TaskType[], task: TaskType) => {
        if (selectedTaskIds.some((id: string) => id === task.id)) {
          acc.push(task);
        }
        return acc;
      }, []),
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
    if (!selectedTaskIds.includes(id)) {
      console.log('add task', id);
      dispatch(addSelectedTasks(id));
    } else {
      console.log('remove task', id);
      dispatch(removeSelectedTasks(id));
    }
  };

  const onAddTasksHandler = () => {
    if (selectedKidId && selectedTasks?.length) {
      console.log('tasks to add: ', selectedTasks);
      const taskPoints = selectedTasks.reduce((acc: number, task: TaskType) => {
        return acc + task.points;
      }, 0);
      const points = selectedKid?.points + taskPoints;
      const taskList = [...(selectedKid?.taskList || []), ...selectedTaskIds];

      updateKid({
        id: selectedKidId,
        body: { points, taskList: JSON.stringify(taskList) },
      });

      dispatch(selectKid(null));
      dispatch(clearSelectedTasks(null));
    }
  };

  const isTaskSelected = (id: string) =>
    selectedTaskIds.some((task: string) => task === id);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = tasks.map((task: any) => (
      <Task
        isAdmin={isAdmin}
        isSelected={isTaskSelected(task.id)}
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
        <p className={STYLES.heading}>Add tasks for {selectedKid?.firstName}</p>
      ) : (
        <p className={STYLES.heading}>Manage your tasks</p>
      )}
      <section className={STYLES.content}>
        {content}
        {selectedTaskIds.length > 0 && (
          <button
            className={STYLES.addButton}
            onClick={onAddTasksHandler}
            type="button"
          >
            Add Tasks
          </button>
        )}
      </section>
      {isAdmin && selectedKidId === null && (
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
