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

export type TNotifications = {
  id: number;
  title: string;
  description: string;
  type: string;
  isRead: boolean;
};

export type TNotificationsCreate = {
  title: string;
  description: string;
  type: string;
  isRead: boolean;
};
