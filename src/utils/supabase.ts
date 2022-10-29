import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://gxrvxptnpgdqciyjqykn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cnZ4cHRucGdkcWNpeWpxeWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcwMDM5MjgsImV4cCI6MTk4MjU3OTkyOH0.kPQl7oJAGseW3wF5pr9YzwdrueoN9ZWAVDPYbwpJWdg',
  {
    auth: {
      storage: AsyncStorage,
      detectSessionInUrl: false,
      persistSession: true,
    },
  },
)
