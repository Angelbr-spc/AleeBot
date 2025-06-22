// ©Créditos A 𝐀𝐥𝐞𝐞𝐁𝐨𝐭 👑
let handler = async (m, { conn, text }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  // Número autorizado (sin espacios ni caracteres especiales)
  const allowedNumber = '584246582666';

  // Verifica si el mensaje proviene de tu número
  if (m.sender.split('@')[0] !== allowedNumber) {
    await conn.sendMessage(m.chat, { text: '❌ *𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 𝐩𝐞𝐫𝐦𝐢𝐬𝐨 𝐩𝐚𝐫𝐚 𝐫𝐞𝐚𝐥𝐢𝐳𝐚𝐫 𝐞𝐬𝐭𝐚 𝐚𝐜𝐜𝐢ó𝐧.*' });
    return;
  }

  // Verifica si el mensaje contiene un enlace de grupo de WhatsApp
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
  const match = text.match(groupLinkPattern);

  if (!match) {
    await conn.sendMessage(m.chat, { text: '❌ *𝐍𝐨 𝐞𝐧𝐯𝐢𝐚𝐬𝐭𝐞 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐯á𝐥𝐢𝐝𝐨 𝐝𝐞 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩.*' });
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
    await conn.sendMessage(m.chat, { text: '❌ *𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐮𝐧𝐢𝐫𝐬𝐞 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨.*' });
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