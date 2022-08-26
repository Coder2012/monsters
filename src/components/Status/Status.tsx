import { useSelector } from 'react-redux';
import { useGetKidsQuery } from '../../features/api/apiSlice';
import { getSelectedKidId } from '../Kids/kidSlice';
import { KidType } from '../Kids/types';

export const Status = () => {
  const selectedKidId = useSelector(getSelectedKidId);

  const { selectedKid } = useGetKidsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedKid: data?.find((kid: KidType) => kid.id === selectedKidId),
    }),
  });
  return (
    <section>
      <p>
        Active:{' '}
        {selectedKidId !== null ? selectedKid?.firstName : 'Select a kid'}
      </p>
    </section>
  );
};
