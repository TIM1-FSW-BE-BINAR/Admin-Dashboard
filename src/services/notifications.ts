import { fetchApi } from '@/lib/fetch';
import {
  TApiResponse,
  TNotifications,
  TNotificationsCreate
} from '@/types/notifications';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const notificationsService = {
  getAll: async (): Promise<TNotifications[]> => {
    const response = await fetchApi<TApiResponse<TNotifications[]>>(
      '/notifications',
      {
        method: 'GET',
        headers: getAuthHeaders()
      }
    );
    return response.data;
  },

  getById: async (id: number): Promise<TNotifications> => {
    const response = await fetchApi<TApiResponse<TNotifications>>(
      `/notifications/${id}`
    );
    return response.data;
  },

  create: async (data: TNotificationsCreate): Promise<TNotifications> => {
    // const formData = new FormData();
    // formData.append('title', data.title);
    // formData.append('description', data.description);
    // formData.append('type', data.type);
    // formData.append('isRead', data.isRead.toString());

    const response = await fetchApi<TApiResponse<TNotifications>>(
      '/notifications',
      {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          type: data.type,
          isRead: data.isRead
        })
      }
    );
    return response.data;
  },

  update: async (
    id: number,
    data: TNotificationsCreate
  ): Promise<TNotifications> => {
    // const formData = new FormData();
    // formData.append('title', data.title);
    // formData.append('description', data.description);
    // formData.append('type', data.type);
    // formData.append('isRead', data.isRead.toString());

    const response = await fetchApi<TApiResponse<TNotifications>>(
      `/notifications/${id}`,
      {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          type: data.type,
          isRead: data.isRead
        })
      }
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetchApi<TApiResponse<void>>(`/notifications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
};