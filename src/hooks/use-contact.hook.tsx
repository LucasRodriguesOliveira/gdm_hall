import useSWR from 'swr';
import { listContactAction } from '../actions/contact/list-contact.action';
import { useEffect } from 'react';
import { useContactStore } from '../store/contact.store';

export const useContact = () => {
  const { init, page, pageSize, setPage, total, contacts } = useContactStore();
  const { data, isLoading, mutate } = useSWR(
    ['contacts', { page, pageSize }],
    (props) => listContactAction(props[1])
  );


  useEffect(() => {
    if (data?.value) {
      init(data.value, mutate);
    }
  }, [init, data?.value, mutate]);

  return {
    isLoading,
    contacts,
    paginated: {
      setPage,
      page,
      pageSize,
      total
    },
  };
};
