export interface TApiResponse<T> {
  meta: {
    statusCode: number;
    message: string;
    pagination: {
      totalPage: number;
      currentPage: number;
      pageItems: number;
      nextPage: number | null;
      prevPage: number | null;
    };
  };
  data: T;
}

// Tipe yang digunakan internal setelah transformasi
export interface TTransformedApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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
