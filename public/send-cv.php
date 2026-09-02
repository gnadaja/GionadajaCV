<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$nombre = trim((string)($input['nombre'] ?? ''));
$email = trim((string)($input['email'] ?? ''));

if ($nombre === '' || $email === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Nombre y email son obligatorios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'El email ingresado no es válido.']);
    exit;
}

$destinatario = 'gnadaja2507@gmail.com';
$asunto = 'Solicitud de CV - ' . $nombre;
$mensaje = "
Nombre: {$nombre}
Email: {$email}

Solicitó recibir el CV.
";

$adjunto = __DIR__ . '/cv.pdf';

if (!file_exists($adjunto)) {
    http_response_code(500);
    echo json_encode(['message' => 'El archivo del CV no está disponible.']);
    exit;
}

$boundary = md5(uniqid(time()));
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
$headers[] = 'From: no-reply@localhost';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$body .= $mensaje . "\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: application/pdf; name=\"cv.pdf\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"cv.pdf\"\r\n\r\n";
$body .= chunk_split(base64_encode(file_get_contents($adjunto))) . "\r\n";
$body .= "--{$boundary}--";

if (mail($destinatario, $asunto, $body, implode("\r\n", $headers))) {
    echo json_encode([
        'message' => 'Tu solicitud fue enviada correctamente. Revisá tu correo para recibir el CV.'
    ]);
    exit;
}

http_response_code(500);
echo json_encode(['message' => 'No se pudo enviar la solicitud. Intentalo más tarde.']);
