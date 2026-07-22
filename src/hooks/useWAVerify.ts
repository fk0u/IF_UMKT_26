import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { WASubmission } from '../types';

export const useWAVerify = () => {
  const queryClient = useQueryClient();

  const submissionsQuery = useQuery({
    queryKey: ['wa_submissions'],
    queryFn: () => mockApi.getWASubmissions(),
  });

  const submitWAVerificationMutation = useMutation({
    mutationFn: (formData: { name: string; nim: string; fileName: string; fileSize: string }) =>
      mockApi.submitWAGroupVerification(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wa_submissions'] });
    },
  });

  const updateWAStatusMutation = useMutation({
    mutationFn: ({ ticketId, status }: { ticketId: string; status: WASubmission['status'] }) =>
      mockApi.updateWASubmissionStatus(ticketId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wa_submissions'] });
    },
  });

  return {
    submissionsQuery,
    submitWAVerificationMutation,
    updateWAStatusMutation,
  };
};
