import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';

export const useForum = () => {
  const queryClient = useQueryClient();

  const forumQuery = useQuery({
    queryKey: ['forum'],
    queryFn: () => mockApi.getForum(),
  });

  const createThreadMutation = useMutation({
    mutationFn: (newThread: { author: string; title: string; category: string; content: string }) => 
      mockApi.createThread(newThread),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum'] });
    },
  });

  const upvoteThreadMutation = useMutation({
    mutationFn: (threadId: string) => mockApi.upvoteThread(threadId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum'] });
    },
  });

  const addReplyMutation = useMutation({
    mutationFn: ({ threadId, content, author }: { threadId: string; content: string; author: string }) =>
      mockApi.addReply(threadId, content, author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum'] });
    },
  });

  return {
    forumQuery,
    createThreadMutation,
    upvoteThreadMutation,
    addReplyMutation,
  };
};
