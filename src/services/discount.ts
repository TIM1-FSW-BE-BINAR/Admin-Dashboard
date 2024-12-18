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
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('code', data.code);
    formData.append('type', data.type);
    formData.append('value', data.value.toString()); // Ensure value is a string
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('minPurchase', data.minPurchase.toString()); // Ensure minPurchase is a string
    formData.append('isActive', data.isActive.toString()); // Ensure isActive is a string
    formData.append('description', data.description);

    const response = await fetchApi<TApiResponse<TDiscounts>>('/discount', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return response.data;
  },

  update: async (id: number, data: TDiscountCreate): Promise<TDiscounts> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('code', data.code);
    formData.append('type', data.type);
    formData.append('value', data.value.toString()); // Ensure value is a string
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('minPurchase', data.minPurchase.toString()); // Ensure minPurchase is a string
    formData.append('isActive', data.isActive.toString()); // Ensure isActive is a string
    formData.append('description', data.description);

    const response = await fetchApi<TApiResponse<TDiscounts>>(
      `/discount/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
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
