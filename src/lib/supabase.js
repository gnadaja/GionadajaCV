import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function submitCvRequest({ nombre, email }) {
  const emailResponse = await fetch('/api/send-cv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, email }),
  });

  const emailResult = await emailResponse.json();

  if (!emailResponse.ok) {
    throw new Error(emailResult.message || 'No se pudo enviar el CV.');
  }

  if (supabase) {
    const { error } = await supabase.from('cv_requests').insert([
      {
        nombre,
        email,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('No se pudo guardar la solicitud en Supabase:', error);
    }
  }

  return {
    message: emailResult.message || 'Tu solicitud se envió correctamente.',
  };
}
