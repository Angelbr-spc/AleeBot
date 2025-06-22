const handler = async (m, { conn }) => {
  const texto = m.text?.toLowerCase().trim();

  // Palabras activadoras sin prefijo
  const activadores = ['delete', 'del', 'elimina', 'borrar'];

  // Si no empieza con alguna palabra clave, no hace nada
  if (!activadores.some(palabra => texto.startsWith(palabra))) return;

  // Si no hay mensaje citado, no se puede eliminar
  if (!m.quoted) return conn.reply(m.chat, '🚩 Responde al mensaje que deseas eliminar.', m);

  try {
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender
      }
    });
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '❌ No se pudo eliminar ese mensaje.', m);
  }
};

handler.customPrefix = /^delete|del|elimina|borrar/i;
handler.command = new RegExp; // Sin prefijo

export default handler;