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

export type TUsers = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: string;
};

export type TUsersCreate = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: string;
};
