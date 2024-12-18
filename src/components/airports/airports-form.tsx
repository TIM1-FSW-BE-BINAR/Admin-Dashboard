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
import { TAirports, TAirportsCreate } from '@/types/airports';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../shared/fileupload';

const decimalRegex = /^-?\d+(\.\d+)?$/;

const formSchema = z.object({
  code: z.string().min(1, 'Kode harus diisi'),
  name: z.string().min(1, 'Nama bandara harus diisi'),
  city: z.string().min(1, 'Kota bandara harus diisi'),
  state: z.string().min(1, 'State bandara harus diisi'),
  country: z.string().min(1, 'Negara bandara harus diisi'),
  timezone: z.string().min(1, 'Timezone harus diisi'),
  latitude: z
    .string()
    .min(1, 'Latitude harus diisi')
    .regex(decimalRegex, 'Latitude harus berupa angka desimal'),
  longitude: z
    .string()
    .min(1, 'longitude harus diisi')
    .regex(decimalRegex, 'Latitude harus berupa angka desimal'),
  elevation: z
    .string()
    .min(1, 'Elevation harus diisi')
    .regex(decimalRegex, 'Elevation harus berupa angka desimal'),
  image: z.instanceof(File, { message: 'Gambar harus diupload' })
});

type TAirportsFormProps = {
  initialData?: TAirports;
  onSubmit: (values: TAirportsCreate) => void;
  loading?: boolean;
};

export function AirportsForm({
  initialData,
  onSubmit,
  loading
}: TAirportsFormProps) {
  const form = useForm<TAirportsCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: initialData?.code || '',
      name: initialData?.name || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      country: initialData?.country || '',
      timezone: initialData?.timezone || '',
      latitude: initialData?.latitude || '',
      longitude: initialData?.longitude || '',
      elevation: initialData?.elevation || ''
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log('Form Error:', errors);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode bandara</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Kode bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama bandara</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kota</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Kota bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan state bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Negara</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan negara bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan timezone bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude bandara</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan latitude bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>longitude bandara</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan longitude bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="elevation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elevation bandara</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan elevation bandara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo bandara</FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(files) => field.onChange(files[0])}
                  value={field.value ? [field.value] : []}
                />
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
  );
}
