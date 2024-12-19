import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TFlights, TFlightCreate } from '@/types/flights';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const flightsService = {
  getAll: async (): Promise<TFlights[]> => {
    const response = await fetchApi<TApiResponse<TFlights[]>>('/flights');

    return response.data;
  },

  getById: async (id: number): Promise<TFlights> => {
    const response = await fetchApi<TApiResponse<TFlights>>(`/flights/${id}`);

    return response.data;
  },

  create: async (data: TFlightCreate): Promise<TFlights> => {
    const response = await fetchApi<TApiResponse<TFlights>>(`/flights`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        flightNumber: data.flightNumber,
        airlineId: data.airlineId,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        terminal: data.terminal,
        price: data.price,
        class: data.class,
        information: data.information
      })
    });

    return response.data;
  },

  update: async (id: number, data: TFlightCreate): Promise<TFlights> => {
    const response = await fetchApi<TApiResponse<TFlights>>(`/flights/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        flightNumber: data.flightNumber,
        airlineId: data.airlineId,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        terminal: data.terminal,
        price: data.price,
        class: data.class,
        information: data.information
      })
    });

    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetchApi<TApiResponse<void>>(`/flights/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
};
