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

export type TAirports = {
  id: number;
  code: string;
  name: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  latitude: string;
  longitude: string;
  elevation: string;
  imageUrl: string;
  imageId: string;
};

export type TAirportsCreate = {
  code: string;
  name: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  latitude: string;
  longitude: string;
  elevation: string;
  image: File;
};
