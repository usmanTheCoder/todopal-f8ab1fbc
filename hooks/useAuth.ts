import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '@/store/authSlice';
import { RootState } from '@/store';
import { register, login, logout, getCurrentUser } from '@/lib/auth';
import { User } from '@/types/user';

interface UseAuthProps {
  redirectTo?: string;
  redirectIfFound?: string;
}

export const useAuth = ({ redirectTo, redirectIfFound }: UseAuthProps = {}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (user) {
          dispatch(setUser(user));
          if (redirectIfFound) {
            router.push(redirectIfFound);
          }
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, redirectIfFound, router]);

  const registerHandler = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const user = await register(email, password);
        dispatch(setUser(user));
        if (redirectTo) {
          router.push(redirectTo);
        }
      } catch (error) {
        setError('Failed to register');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, redirectTo, router]
  );

  const loginHandler = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const user = await login(email, password);
        dispatch(setUser(user));
        if (redirectTo) {
          router.push(redirectTo);
        }
      } catch (error) {
        setError('Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, redirectTo, router]
  );

  const logoutHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await logout();
      dispatch(clearUser());
      router.push('/auth/login');
    } catch (error) {
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, router]);

  return {
    user,
    isLoading,
    error,
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
};