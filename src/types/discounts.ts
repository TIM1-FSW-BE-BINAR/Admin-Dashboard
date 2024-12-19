export type TApiResponse<T> = {
  meta: {
    statusCode: number;
    message: string;
    pagination:
      | null
      | {
          // tambahkan struktur pagination jika ada
        };
  };
  data: T;
};

export type TDiscounts = {
  id: number;
  name: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  minPurchase: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  code: string;
  description: string;
};

export type TDiscountCreate = {
  name: string;
  code: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  minPurchase: number;
  isActive: boolean;
  description: string;
};
