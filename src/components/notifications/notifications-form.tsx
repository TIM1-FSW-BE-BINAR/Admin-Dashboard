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
import { TNotifications, TNotificationsCreate } from '@/types/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  type: z.enum(['INFO', 'DISCOUNT', 'ACCOUNT', 'EVENT', 'PAYMENT'], {
    errorMap: () => ({ message: 'Tipe notifikasi tidak valid' })
  }),
  isRead: z.boolean()
});

type TNotificationsFormProps = {
  initialData?: TNotifications;
  onSubmit: (values: TNotificationsCreate) => void;
  loading?: boolean;
};

export function NotificationsForm({
  initialData,
  onSubmit,
  loading
}: TNotificationsFormProps) {
  const form = useForm<TNotificationsCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      type: initialData?.type || 'INFO',
      isRead: initialData?.isRead || false
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Notifikasi</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul notifikasi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Notifikasi</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan deskripsi notifikasi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
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
                    value="INFO"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    Info
                  </option>
                  <option
                    value="DISCOUNT"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    Discount
                  </option>
                  <option
                    value="ACCOUNT"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    Account
                  </option>
                  <option
                    value="EVENT"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    Event
                  </option>
                  <option
                    value="PAYMENT"
                    style={{
                      backgroundColor: '#020817',
                      color: '#FFF'
                    }}
                  >
                    Payment
                  </option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isRead"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Baca</FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
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
