import { fetchApi } from '@/lib/fetch';
import { TApiResponse, Tbookings, TDataResponse } from '@/types/dashboard';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const dashboardService = {
  getAll: async (): Promise<Tbookings[]> => {
    const response = await fetchApi<TApiResponse<Tbookings[]>>(
      '/booking?page=1&limit=20&sort=dsc',
      {
        method: 'GET',
        headers: getAuthHeaders()
      }
    );
    return response.data;
  },

  getTotal: async (): Promise<TApiResponse<TDataResponse>> => {
    const response = await fetchApi<TApiResponse<TDataResponse>>(
      '/admin/count',
      {
        method: 'GET',
        headers: getAuthHeaders()
      }
    );
    return response;
  }
};
