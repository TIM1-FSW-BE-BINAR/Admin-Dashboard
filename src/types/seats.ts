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

export type TSeats = {
  id: number;
  flightId: number;
  seatNumber: string;
  status: string;
  departureTime: string;
  arrivalTime: string;
};

export type TSeatsCreate = {
  flightId: number;
  seatNumber: string;
  status: string;
  departureTime: string;
  arrivalTime: string;
};
