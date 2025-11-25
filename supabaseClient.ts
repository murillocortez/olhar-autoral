
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ouuxwiidjksjewsdzspu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dXh3aWlkamtzamV3c2R6c3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTQzMTQsImV4cCI6MjA3OTU3MDMxNH0.usZ9tf8MyLYJ00j1_tV_HcPPvpANneoeGgRnW13CvLQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
