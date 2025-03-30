
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
}

export async function saveItinerary(userId: string, itineraryData: any) {
  const { data, error } = await supabase
    .from('itineraries')
    .insert([
      {
        user_id: userId,
        destination: itineraryData.destination,
        start_date: itineraryData.dates.start,
        end_date: itineraryData.dates.end,
        travelers: itineraryData.travelers,
        total_budget: itineraryData.totalBudget,
        content: itineraryData.rawItinerary,
      },
    ]);
  
  return { data, error };
}

export async function getUserItineraries(userId: string) {
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .eq('user_id', userId);
  
  return { data, error };
}
