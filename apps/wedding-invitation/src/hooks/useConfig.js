import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { configService } from '../services/configService';

export const useConfig = (key) => {
  return useQuery({
    queryKey: ['config', key],
    queryFn: () => configService.get(key),
    enabled: !!key,
  });
};

export const useUpdateConfig = (key) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value) => configService.update(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config', key] });
    },
  });
};
