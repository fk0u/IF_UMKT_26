import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { NewsItem } from '../types';

export const useNews = () => {
  const queryClient = useQueryClient();

  const newsQuery = useQuery({
    queryKey: ['news'],
    queryFn: () => mockApi.getNews(),
  });

  const createNewsMutation = useMutation({
    mutationFn: (newNews: Omit<NewsItem, 'id' | 'date' | 'author'>) => mockApi.createNews(newNews),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: (newsId: string) => mockApi.deleteNews(newsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });

  return {
    newsQuery,
    createNewsMutation,
    deleteNewsMutation,
  };
};
