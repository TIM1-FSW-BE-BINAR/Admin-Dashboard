import { fetchApi } from '@/lib/fetch';
import { TApiResponse, TDiscounts, TDiscountCreate } from '@/types/discounts';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const discountsService = {
  getAll: async (): Promise<TDiscounts[]> => {
    const response = await fetchApi<TApiResponse<TDiscounts[]>>('/discount');

    return response.data;
  },

  getById: async (id: number): Promise<TDiscounts> => {
    const response = await fetchApi<TApiResponse<TDiscounts>>(
      `/discount/${id}`
    );

    return response.data;
  },

  create: async (data: TDiscountCreate): Promise<TDiscounts> => {
    const response = await fetchApi<TApiResponse<TDiscounts>>(`/discount`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        code: data.code,
        type: data.type,
        value: data.value,
        startDate: data.startDate,
        endDate: data.endDate,
        minPurchase: data.minPurchase,
        isActive: data.isActive,
        description: data.description
      })
    });

    return response.data;
  },

  update: async (id: number, data: TDiscountCreate): Promise<TDiscounts> => {
    const response = await fetchApi<TApiResponse<TDiscounts>>(
      `/discount/${id}`,
      {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          code: data.code,
          type: data.type,
          value: data.value,
          startDate: data.startDate,
          endDate: data.endDate,
          minPurchase: data.minPurchase,
          isActive: data.isActive,
          description: data.description
        })
      }
    );

    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetchApi<TApiResponse<void>>(`/discount/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  }
};
