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

export type Tbookings = {
  id: number;
  code: string;
  bookingDate: string;
  createdAt: string;
  status: string;
  totalPrice: number;
  flight: {
    flightNumber: string;
    class: string;
  };
};

export type TDataResponse = {
  totalAirlines: number;
  totalAirports: number;
  totalFlights: number;
  totalUsers: number;
  totalTransactions: number;
  totalDiscounts: number;
  totalNotifications: number;
  totalBookings: number;
  totalPassengers: number;
  totalSeats: number;
  totalTickets: number;
};
