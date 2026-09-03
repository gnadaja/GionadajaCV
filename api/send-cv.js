import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Método no permitido.' });
  }

  const { nombre, email } = request.body || {};

  if (!nombre || !email) {
    return response.status(400).json({ message: 'Nombre y email son obligatorios.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ message: 'El email ingresado no es válido.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return response.status(500).json({ message: 'El servicio de correo no está configurado.' });
  }

  try {
    const cvPath = path.join(process.cwd(), 'public', 'cv.pdf');
    const cvFile = await readFile(cvPath);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      reply_to: process.env.RESEND_REPLY_TO_EMAIL || process.env.RESEND_FROM_EMAIL,
      subject: 'CV - FULL STACK DEVELOPER JR',
      text: `Hola ${nombre},\n\nGracias por solicitar mi currículum. Te envío adjunto mi CV.\n\nEste es un email de prueba enviado desde mi portfolio.\n\nSaludos,\nGiovanni Nadaja`,
      attachments: [
        {
          filename: 'cv.pdf',
          content: cvFile,
        },
      ],
    });

    if (error) {
      return response.status(502).json({ message: error.message || 'Resend no pudo enviar el email.' });
    }

    return response.status(200).json({ message: 'El CV fue enviado correctamente a tu email.' });
  } catch (error) {
    console.error('Error enviando CV:', error);
    return response.status(500).json({ message: 'No se pudo enviar el CV. Intentalo más tarde.' });
  }
}
