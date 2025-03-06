import { useAppSelector } from '@/hooks/useStore';

export const useAuth = () => {
  const { user, token } = useAppSelector(state => state.auth);
  
  return { 
    data: user, 
    isError: !token, 
    isLoading: false 
  };
};