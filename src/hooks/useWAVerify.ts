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
    mutationFn: (formData: { 
      name: string; 
      nim: string; 
      whatsapp: string; 
      fileName: string; 
      fileSize: string;
      ocrSuccess: boolean;
      ocrChecks?: {
        nameMatches: boolean;
        nimMatches: boolean;
        prodiMatches: boolean;
        yearMatches: boolean;
      };
    }) => mockApi.submitWAGroupVerification(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wa_submissions'] });
    },
  });

  const updateWAStatusMutation = useMutation({
    mutationFn: ({ ticketId, status, rejectionReason }: { ticketId: string; status: WASubmission['status']; rejectionReason?: string }) =>
      mockApi.updateWASubmissionStatus(ticketId, status, rejectionReason),
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
