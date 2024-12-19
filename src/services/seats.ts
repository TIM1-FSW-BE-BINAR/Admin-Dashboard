import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TSeats, TSeatsCreate } from '@/types/seats';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const seatsService = {
  getAll: async (
    page: number,
    limit: number
  ): Promise<TApiResponse<TSeats[]>> => {
    try {
      const response = await fetchApi<TApiResponse<TSeats[]>>(
        `/seats?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: getAuthHeaders()
        }
      );

      // Transform response untuk menyesuaikan dengan format yang diharapkan
      return {
        data: response.data,
        meta: {
          total:
            response.meta.pagination.totalPage *
            response.meta.pagination.pageItems, // Perkiraan total items
          page: response.meta.pagination.currentPage,
          limit: response.meta.pagination.pageItems,
          totalPages: response.meta.pagination.totalPage
        }
      };
    } catch (error) {
      console.error('Service Error:', error);
      throw error;
    }
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
