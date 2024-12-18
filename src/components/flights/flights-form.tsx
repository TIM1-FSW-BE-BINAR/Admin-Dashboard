import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TFlights, TFlightCreate } from '@/types/flights';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { airlinesService } from '@/services/airline';
import { airportsService } from '@/services/airport';
import * as z from 'zod';

const formSchema = z.object({
  flightNumber: z.string().min(1, 'Flight number must be filled'),
  airlineId: z.coerce.number().min(1, 'Airline must be filled'),
  departureAirport: z.coerce
    .number()
    .min(1, 'Departure airport must be filled'),
  arrivalAirport: z.coerce.number().min(1, 'Arrival airport must be filled'),
  departureTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Date is not valid'),
  arrivalTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Date is not valid'),
  terminal: z.string().min(1, 'Terminal must be filled'),
  price: z.coerce.number().min(1, 'Price must be filled'),
  class: z.enum(['ECONOMY', 'FIRST', 'PREMIUM_ECONOMY', 'BUSINESS'], {
    errorMap: () => ({ message: 'Class is not valid' })
  }),
  information: z.string().min(1, 'Information must be filled')
});

type TFlightsFormProps = {
  initialData?: TFlights;
  onSubmit: (values: TFlightCreate) => void;
  loading?: boolean;
};

export function FlightsForm({
  initialData,
  onSubmit,
  loading
}: TFlightsFormProps) {
  const form = useForm<TFlightCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: initialData?.flightNumber || '',
      airlineId: initialData?.airlineId || 0,
      departureAirport: initialData?.departureAirport || 0,
      arrivalAirport: initialData?.arrivalAirport || 0,
      departureTime: initialData?.departureTime
        ? initialData.departureTime.slice(0, 16)
        : '2024-01-01T00:00',
      arrivalTime: initialData?.arrivalTime
        ? initialData.arrivalTime.slice(0, 16)
        : '2024-01-02T00:00',
      terminal: initialData?.terminal || '',
      price: initialData?.price || 0,
      class: initialData?.class || 'ECONOMY',
      information: initialData?.information || ''
    }
  });

  const { data: airlines } = useQuery({
    queryKey: ['airlines'],
    queryFn: airlinesService.getAll
  });
  const { data: airports } = useQuery({
    queryKey: ['airports'],
    queryFn: airportsService.getAll
  });

  if (!airlines || !airports) {
    return <p>Error loading options. Please try again later.</p>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[500px] space-y-8 overflow-y-auto p-4"
      >
        <FormField
          control={form.control}
          name="flightNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flight Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter flight number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="airlineId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Airline</FormLabel>
              <FormControl
                style={{
                  width: '100%',
                  height: '60%',
                  padding: '0.5rem',
                  border: '0.5px solid #fff',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#020817',
                  color: '#FFF',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  transition:
                    'border-color 0.3s ease, background-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#020817';
                  e.target.style.backgroundColor = '#333';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#020817';
                  e.target.style.backgroundColor = '#020817';
                }}
              >
                <select {...field}>
                  <option value="">Select Airline</option>
                  {airlines.map((airline) => (
                    <option key={airline.id} value={airline.id}>
                      {airline.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departureAirport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Airport</FormLabel>
              <FormControl
                style={{
                  width: '100%',
                  height: '60%',
                  padding: '0.5rem',
                  border: '0.5px solid #fff',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#020817',
                  color: '#FFF',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  transition:
                    'border-color 0.3s ease, background-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#020817';
                  e.target.style.backgroundColor = '#333';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#020817';
                  e.target.style.backgroundColor = '#020817';
                }}
              >
                <select {...field}>
                  <option value="">Select Departure Airport</option>
                  {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departureTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pilih tanggal mulai"
                  type="datetime-local"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arrivalAirport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Airport</FormLabel>
              <FormControl
                style={{
                  width: '100%',
                  height: '60%',
                  padding: '0.5rem',
                  border: '0.5px solid #fff',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#020817',
                  color: '#FFF',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  transition:
                    'border-color 0.3s ease, background-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#020817';
                  e.target.style.backgroundColor = '#333';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#020817';
                  e.target.style.backgroundColor = '#020817';
                }}
              >
                <select {...field}>
                  <option value="">Select Arrival Airport</option>
                  {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arrivalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pilih tanggal mulai"
                  type="datetime-local"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terminal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terminal</FormLabel>
              <FormControl>
                <Input placeholder="Enter Terminal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Notifikasi</FormLabel>
              <FormControl>
                <select
                  {...field}
                  style={{
                    width: '100%',
                    height: '60%',
                    padding: '0.5rem',
                    border: '0.5px solid #fff',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: '#020817',
                    color: '#FFF',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    transition:
                      'border-color 0.3s ease, background-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#020817';
                    e.target.style.backgroundColor = '#333';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#020817';
                    e.target.style.backgroundColor = '#020817';
                  }}
                >
                  <option
                    value="ECONOMY"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    ECONOMY
                  </option>
                  <option
                    value="FIRST"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    FIRST
                  </option>
                  <option
                    value="BUSINESS"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    BUSINESS
                  </option>
                  <option
                    value="PREMIUM_ECONOMY"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    PREMIUM ECONOMY
                  </option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Information</FormLabel>
              <FormControl>
                <Input placeholder="Enter information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
