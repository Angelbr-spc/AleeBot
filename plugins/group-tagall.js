const wm = '𝐀𝐥𝐞𝐞 𝐁𝐨𝐭 👑';

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const texto = m.text?.trim() || '';
  const comando = texto.split(' ')[0].replace(/^./, ''); // quita punto si tiene
  const mensaje = texto.replace(/^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i, '').trim();

  let textoFinal = `🗣️ 𝐈𝐍𝐕𝐎𝐂𝐀𝐍𝐃𝐎 𝐌𝐀𝐌𝐔𝐓𝐒 🗣️\n\n𝐀𝐕𝐈𝐒𝐎: ${mensaje || ''}\n\n`;

  for (const user of participants) {
    textoFinal += `👑 @${user.id.split('@')[0]}\n`;
  }

  textoFinal += `\n${wm}`;

  await conn.sendMessage(m.chat, {
    text: textoFinal,
    mentions: participants.map(p => p.id)
  });
};

// 🎯 Detecta .tagall, tagall, invocar, etc.
handler.customPrefix = /^(\.|)(tagall|invocar|invocacion|invocación|todos|talibanes)/i;
handler.command = new RegExp(); // Necesario para que funcione con customPrefix

handler.group = true;
handler.admin = true;

export default handler;