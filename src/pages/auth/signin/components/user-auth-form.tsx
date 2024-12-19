import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { setToken, setUsers } from '../../../../redux/slices';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { authService } from '@/services/auth'; // Import service login
import { toast } from 'react-toastify'; // Import Toastify

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, 'Password minimal berisi 8 karakter')
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Update state for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  const defaultValues = {
    email: 'demo@gmail.com',
    password: '' // Tambahkan default untuk password
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data.email, data.password);
      localStorage.setItem('token', response.token);

      // Ambil data user setelah login
      const userData = await authService.getCurrentUser();

      if (userData.role === 'ADMIN') {
        // Simpan token dan user ke Redux
        dispatch(setToken(response.token));
        dispatch(setUsers(userData));

        toast.success('Login Successful');
        router.push('/'); // Redirect ke halaman utama
      } else {
        toast.error(
          'You do not have the required permissions to access this page.'
        );
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error('Email or password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading ? 'Loading...' : 'Continue With Email'}
          </Button>
        </form>
      </Form>
    </>
  );
}
