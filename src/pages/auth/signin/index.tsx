import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../../assets/airfly.png';
import background from '../../../assets/Frame 1.svg';
import plane from '../../../assets/plane.svg';
import { RootState } from '../../../redux/store';

export default function SignInPage() {
  const navigate = useNavigate();

  // Mengambil data user dan token dari Redux store
  const { token } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col items-center justify-center bg-muted p-10  text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-primary"
          style={{
            flex: 1,
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100%'
          }}
        />
        <div className="relative z-20 flex flex-col items-center justify-center text-lg font-medium">
          <img
            src={plane}
            alt=""
            style={{
              opacity: 0.9,
              filter: 'blur(0.5px)'
            }}
          />
          <img
            src={logo}
            alt=""
            style={{
              opacity: 0.9,
              filter: 'blur(0.5px)',
              height: '100px'
            }}
          />
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              to=""
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to=""
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
