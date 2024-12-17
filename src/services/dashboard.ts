import { fetchApi } from '@/lib/fetch';
import { TApiResponse, Tbookings } from '@/types/dashboard';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const dashboardService = {
  getAll: async (): Promise<Tbookings[]> => {
    const response = await fetchApi<TApiResponse<Tbookings[]>>(
      '/booking?page=1&limit=20',
      {
        method: 'GET',
        headers: getAuthHeaders()
      }
    );
    return response.data;
  }
};
