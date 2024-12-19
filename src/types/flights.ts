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

export type TFlights = {
  id: number;
  flightNumber: string;
  airlineId: number;
  departureAirport: number;
  arrivalAirport: number;
  departureTime: string;
  arrivalTime: string;
  terminal: string;
  price: number;
  class: string;
  information: string;
};

export type TFlightCreate = {
  flightNumber: string;
  airlineId: number;
  departureAirport: number;
  arrivalAirport: number;
  departureTime: string;
  arrivalTime: string;
  terminal: string;
  price: number;
  class: string;
  information: string;
};
