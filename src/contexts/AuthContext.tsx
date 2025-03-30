
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';

type User = {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const fetchUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          setUser(user as User);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as User || null);
      setIsLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
