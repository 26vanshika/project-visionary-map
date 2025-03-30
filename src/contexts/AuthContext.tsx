
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type AuthUser = {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
} | null;

type AuthContextType = {
  user: AuthUser;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const fetchUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error fetching user:', error);
        } else if (user) {
          // Cast user to AuthUser type with optional full_name
          setUser({
            id: user.id,
            email: user.email || '',
            user_metadata: {
              full_name: user.user_metadata?.full_name || ''
            }
          });
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
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: {
            full_name: session.user.user_metadata?.full_name || ''
          }
        });
      } else {
        setUser(null);
      }
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
