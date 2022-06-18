import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useAddKidMutation,
  useGetKidsQuery,
  useUpdateKidMutation,
} from '../../features/api/apiSlice';
import { NavList } from '../Navigation';

import STYLES from '../common/styles.module.css';
import COMMON_STYLES from '../common/styles.module.css';

import { Kid } from './kid';
import { getSelectedKidId, selectKid } from './kidSlice';

import { Status } from '../Status';
import { useParams } from 'react-router-dom';

type Inputs = {
  firstName: string;
  lastName: string;
  monster: string;
};

export const Kids = () => {
  const { admin } = useParams();
  const isAdmin = admin === 'admin';
  const dispatch = useDispatch();
  const selectedKidId = useSelector(getSelectedKidId);
  const [updateKid] = useUpdateKidMutation();

  const {
    data: kids,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKidsQuery();

  const { register, handleSubmit } = useForm<Inputs>();

  const [addKid] = useAddKidMutation();

  const onSubmit: SubmitHandler<Inputs> = data => {
    try {
      console.log('adding kid', data);
      addKid(data);
    } catch (err) {
      console.error('Failed to save the kid: ', err);
    }
  };

  const onKidSelected = (id: string) => {
    if (id !== selectedKidId) {
      dispatch(selectKid(id));
    } else {
      dispatch(selectKid(null));
    }
  };

  const resetHandler = () => {
    if (selectedKidId) {
      updateKid({
        id: selectedKidId,
        body: { points: 0, taskList: JSON.stringify([]) },
      });
    }
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = kids.map((kid: any) => (
      <Kid
        isActive={kid.id === selectedKidId}
        key={kid.id}
        firstName={kid.firstName}
        lastName={kid.lastName}
        points={kid.points}
        monster={kid.monster}
        onClickHandler={() => onKidSelected(kid.id)}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <header className="App-header">
        <h1>Kids</h1>
        <Status />
      </header>
      <NavList />
      {isAdmin && (
        <section className={COMMON_STYLES.content}>
          <button
            className={COMMON_STYLES.addButton}
            onClick={resetHandler}
            type="button"
          >
            Reset
          </button>
        </section>
      )}
      <section className={STYLES.content}>{content}</section>

      {isAdmin && (
        <section className={STYLES.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <legend>Add a new kid</legend>
            <input
              {...register('firstName', { required: 'Enter your first name' })}
              placeholder="First name"
            />
            <input
              {...register('lastName', { required: 'Enter your last name' })}
              placeholder="Last name"
            />
            <label>Monster</label>
            <select {...register('monster')}>
              <option value="0">Izzy</option>
              <option value="1">Opchoss</option>
              <option value="2">Alien</option>
              <option value="3">Danger</option>
              <option value="4">Viking</option>
              <option value="5">Fang</option>
              <option value="6">Bubble</option>
              <option value="7">Hypnotic</option>
              <option value="8">Happy</option>
              <option value="9">Runner</option>
              <option value="10">Cruncher</option>
              <option value="11">Boxy</option>
            </select>
            <input className={STYLES.button} type="submit" value="Add" />
          </form>
        </section>
      )}
    </section>
  );
};
