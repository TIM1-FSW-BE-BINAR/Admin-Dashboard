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

export type TAirlines = {
  id: number;
  name: string;
  imageUrl: string;
  imageId: string;
};

export type TAirlinesCreate = {
  name: string;
  image: File;
};
