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
import { TDiscounts, TDiscountCreate } from '@/types/discounts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nama diskon harus diisi'),
  code: z.string().min(1, 'Kode diskon harus diisi'),
  type: z.string().min(1, 'Tipe diskon harus diisi'),
  value: z.coerce.number().min(1, 'Nilai diskon harus lebih dari 0'),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Tanggal mulai tidak valid'),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Tanggal akhir tidak valid'),
  minPurchase: z.coerce.number().min(0, 'Pembelian minimum harus lebih dari 0'),
  isActive: z.boolean(),
  description: z.string().optional()
});

type TDiscountsFormProps = {
  initialData?: TDiscounts;
  onSubmit: (values: TDiscountCreate) => void;
  loading?: boolean;
};

export function DiscountsForm({
  initialData,
  onSubmit,
  loading
}: TDiscountsFormProps) {
  const form = useForm<TDiscountCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      code: initialData?.code || '',
      type: initialData?.type || '',
      value: initialData?.value || 0,
      startDate: initialData?.startDate
        ? initialData.startDate.slice(0, 16)
        : '2024-01-01T00:00',
      endDate: initialData?.endDate
        ? initialData.endDate.slice(0, 16)
        : '2024-01-02T00:00',
      minPurchase: initialData?.minPurchase || 0,
      isActive: initialData?.isActive || false,
      description: initialData?.description || ''
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[500px] space-y-8 overflow-y-auto p-4 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Diskon</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama diskon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Diskon</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan kode diskon" {...field} />
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
              <FormLabel>Tipe Diskon</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan tipe diskon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nilai Diskon</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan nilai diskon"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Mulai</FormLabel>
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
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Akhir</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pilih tanggal akhir"
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
          name="minPurchase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimal Pembelian</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan minimal pembelian"
                  type="number"
                  {...field}
                />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
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
