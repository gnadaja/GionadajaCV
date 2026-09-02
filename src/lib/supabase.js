import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function submitCvRequest({ nombre, email }) {
  if (!supabase) {
    return {
      message: 'Demo local activa: tu solicitud fue registrada en la sesión actual.',
    };
  }

  const { error } = await supabase.from('cv_requests').insert([
    {
      nombre,
      email,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error(error.message || 'No se pudo guardar la solicitud.');
  }

  return {
    message: 'Tu solicitud se envió correctamente.',
  };
}
