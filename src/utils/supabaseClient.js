import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://alxzshfogbpwunqoafwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseHpzaGZvZ2Jwd3VucW9hZndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1ODE3MDUsImV4cCI6MjAzNTE1NzcwNX0.DvhHwhLrP4fdkkae0s4ER3xbTQmVPdogXojFN5I7ZwY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
