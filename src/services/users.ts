import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TUsers } from '@/types/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const usersService = {
  getAll: async (): Promise<TUsers[]> => {
    const response = await fetchApi<TApiResponse<TUsers[]>>('/users', {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return response.data;
  },

  getById: async (id: number): Promise<TUsers> => {
    const response = await fetchApi<TApiResponse<TUsers>>(`/users/${id}`);
    return response.data;
  }
};
