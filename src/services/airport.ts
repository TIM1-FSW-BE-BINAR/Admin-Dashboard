import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TAirports, TAirportsCreate } from '@/types/airports';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const airportsService = {
  getAll: async (): Promise<TAirports[]> => {
    const response = await fetchApi<TApiResponse<TAirports[]>>('/airports');
    return response.data;
  },

  getById: async (id: number): Promise<TAirports> => {
    const response = await fetchApi<TApiResponse<TAirports>>(`/airports/${id}`);
    return response.data;
  },

  create: async (data: TAirportsCreate): Promise<TAirports> => {
    const formData = new FormData();
    console.log(typeof data.latitude);
    formData.append('code', data.code);
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('country', data.country);
    formData.append('timezone', data.timezone);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('elevation', data.elevation);
    formData.append('image', data.image);

    const response = await fetchApi<TApiResponse<TAirports>>('/airports', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return response.data;
  },

  update: async (id: number, data: TAirportsCreate): Promise<TAirports> => {
    const formData = new FormData();
    formData.append('code', data.code);
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('country', data.country);
    formData.append('timezone', data.timezone);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('elevation', data.elevation);
    formData.append('image', data.image);

    const response = await fetchApi<TApiResponse<TAirports>>(
      `/airports/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
      }
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetchApi<TApiResponse<void>>(`/airports/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
};
