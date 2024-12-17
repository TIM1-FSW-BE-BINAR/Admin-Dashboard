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
import { TAirlines, TAirlinesCreate } from '@/types/airlines';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FileUpload from '../shared/fileupload';

const formSchema = z.object({
  name: z.string().min(1, 'Nama maskapai harus diisi'),
  image: z.instanceof(File, { message: 'Gambar harus diupload' })
});

type TAirlinesFormProps = {
  initialData?: TAirlines;
  onSubmit: (values: TAirlinesCreate) => void;
  loading?: boolean;
};

export function AirlinesForm({
  initialData,
  onSubmit,
  loading
}: TAirlinesFormProps) {
  const form = useForm<TAirlinesCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Maskapai</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama maskapai" {...field} />
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
              <FormLabel>Logo Maskapai</FormLabel>
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
