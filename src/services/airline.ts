import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TAirlines, TAirlinesCreate } from '@/types/airlines';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const airlinesService = {
  getAll: async (): Promise<TAirlines[]> => {
    const response = await fetchApi<TApiResponse<TAirlines[]>>('/airlines');
    return response.data;
  },

  getById: async (id: number): Promise<TAirlines> => {
    const response = await fetchApi<TApiResponse<TAirlines>>(`/airlines/${id}`);
    return response.data;
  },

  create: async (data: TAirlinesCreate): Promise<TAirlines> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);

    const response = await fetchApi<TApiResponse<TAirlines>>('/airlines', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return response.data;
  },

  update: async (id: number, data: TAirlinesCreate): Promise<TAirlines> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);

    const response = await fetchApi<TApiResponse<TAirlines>>(
      `/airlines/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
      }
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetchApi<TApiResponse<void>>(`/airlines/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
};
