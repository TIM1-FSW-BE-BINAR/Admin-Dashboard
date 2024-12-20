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
import { TSeats, TSeatsCreate } from '@/types/seats';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ToastContainer } from 'react-toastify';

const formSchema = z.object({
  flightId: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Flight ID harus diisi')
  ),
  seatNumber: z.string().min(1, 'Nomor kursi harus diisi'),
  status: z.enum(['AVAILABLE', 'UNAVAILABLE', 'LOCKED'], {
    errorMap: () => ({ message: 'Status tidak valid' })
  }),
  departureTime: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      'Waktu keberangkatan tidak valid'
    ),
  arrivalTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Waktu kedatangan tidak valid')
});

type TSeatsFormProps = {
  initialData?: TSeats;
  onSubmit: (values: TSeatsCreate) => void;
  loading?: boolean;
};

export function SeatsForm({ initialData, onSubmit, loading }: TSeatsFormProps) {
  const form = useForm<TSeatsCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightId: initialData?.flightId || 1,
      seatNumber: initialData?.seatNumber || '',
      status: initialData?.status || 'AVAILABLE',
      departureTime: initialData?.departureTime
        ? initialData.departureTime.slice(0, 16)
        : '2024-01-01T00:00',
      arrivalTime: initialData?.arrivalTime
        ? initialData.arrivalTime.slice(0, 16)
        : '2024-01-02T00:00'
    }
  });

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="flightId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan Flight ID"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seat Number</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nomor kursi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
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
                      value="AVAILABLE"
                      style={{
                        backgroundColor: '#020817',
                        color: '#FFF'
                      }}
                    >
                      Available
                    </option>
                    <option
                      value="UNAVAILABLE"
                      style={{
                        backgroundColor: '#020817',
                        color: '#FFF'
                      }}
                    >
                      Unavailable
                    </option>
                    <option
                      value="LOCKED"
                      style={{
                        backgroundColor: '#020817',
                        color: '#FFF'
                      }}
                    >
                      Locked
                    </option>
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
                  <Input type="datetime-local" {...field} />
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
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Simpan'}
          </Button>
        </form>
      </Form>
    </>
  );
}
