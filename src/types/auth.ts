export type TApiResponse<T> = {
  meta: {
    statusCode: number;
    message: string;
  };
  data: T;
};

export type TAuth = {
  email: string;
  password: string;
  token: string;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'VERIFIED' | 'UNVERIFIED';
  role: 'ADMIN' | 'USER';
};
