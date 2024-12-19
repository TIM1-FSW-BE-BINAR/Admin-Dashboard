import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TAuth, TUser } from '@/types/auth';

export const authService = {
  login: async (email: string, password: string): Promise<TAuth> => {
    const response = await fetchApi<TApiResponse<TAuth>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data;
  },

  getCurrentUser: async (): Promise<TUser> => {
    const response = await fetchApi<TApiResponse<TUser>>('/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  }
};
