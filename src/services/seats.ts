import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TSeats, TSeatsCreate } from '@/types/seats';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const seatsService = {
  getAll: async (): Promise<TSeats[]> => {
    const response = await fetchApi<TApiResponse<TSeats[]>>(
      '/seats?page=253&limit=30',
      {
        method: 'GET',
        headers: getAuthHeaders()
      }
    );
    return response.data;
  },

  getById: async (id: number): Promise<TSeats> => {
    const response = await fetchApi<TApiResponse<TSeats>>(`/seats/${id}`);
    return response.data;
  },

  create: async (data: TSeatsCreate): Promise<TSeats> => {
    const response = await fetchApi<TApiResponse<TSeats>>('/seats', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        flightId: data.flightId,
        seatNumber: data.seatNumber,
        status: data.status,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime
      })
    });
    return response.data;
  },

  update: async (id: number, data: TSeatsCreate): Promise<TSeats> => {
    const response = await fetchApi<TApiResponse<TSeats>>(`/seats/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        flightId: data.flightId,
        seatNumber: data.seatNumber,
        status: data.status,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime
      })
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetchApi<TApiResponse<void>>(`/seats/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
};
