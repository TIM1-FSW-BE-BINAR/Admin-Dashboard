import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TAuth, TUser } from '@/types/auth';

export const authService = {
  login: async (email: string, password: string): Promise<TAuth> => {
    // Mengirimkan request ke API login dengan data email dan password
    const response = await fetchApi<TApiResponse<TAuth>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    // Mengembalikan data yang diterima dari server
    return response.data;
  },

  getCurrentUser: async (): Promise<TUser> => {
    // Mengirimkan request ke endpoint /me untuk mendapatkan data user saat ini
    const response = await fetchApi<TApiResponse<TUser>>('/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Tambahkan Authorization header jika diperlukan
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Mengembalikan data user yang diterima dari server
    return response.data;
  }
};
