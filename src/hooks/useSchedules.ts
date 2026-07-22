import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';

export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: () => mockApi.getSchedules(),
    staleTime: Infinity,
  });
};
