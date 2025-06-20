// ©Créditos A 𝐀𝐥𝐞𝐞𝐁𝐨𝐭 👑
let handler = async (m, { conn, text }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  // Número autorizado (sin espacios ni caracteres especiales)
  const allowedNumber = '584246582666';

  // Verifica si el mensaje proviene de tu número
  if (m.sender.split('@')[0] !== allowedNumber) {
    await conn.sendMessage(m.chat, { text: '❌ *No tienes permiso para realizar esta acción.*' });
    return;
  }

  // Verifica si el mensaje contiene un enlace de grupo de WhatsApp
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
  const match = text.match(groupLinkPattern);

  if (!match) {
    await conn.sendMessage(m.chat, { text: '❌ *No enviaste un enlace válido de grupo de WhatsApp.*' });
    return;
  }

  const groupId = match[1];
  const message = "〔🚀 *BARBOZA-BOT* 🚀〕\n\n*Enlace recibido correctamente.*";

  try {
    // Acepta la invitación al grupo
    await conn.groupAcceptInvite(groupId);

    // Envía un mensaje de confirmación
    await conn.sendMessage(m.chat, { text: message });
  } catch (error) {
    console.error('Error al aceptar el enlace del grupo:', error);
    await conn.sendMessage(m.chat, { text: '❌ *Hubo un error al intentar unirse al grupo.*' });
  }
};

// Configuración para que el código siempre esté activo
Object.defineProperty(handler, 'alwaysOn', {
  value: true, // Indica que el handler está siempre activo
  writable: false, // Protege esta propiedad contra modificaciones
});

handler.help = ['link2'];
handler.tags = ['enlace2'];
handler.command = ['link2'];
export default handler;