const handler = async (m, { conn, text, participants }) => {
  const users = participants.map(p => p.id);
  const commandUsed = m.text?.split(' ')[0] || '';
  const mensaje = text?.replace(new RegExp(`^${commandUsed}`, 'i'), '').trim();

  if (m.quoted) {
    const quoted = m.quoted;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const options = { mentions: users, quoted: m };

    if (isMedia) {
      const media = await quoted.download();
      if (/image/.test(mime)) {
        return await conn.sendMessage(m.chat, { image: media, caption: mensaje, ...options });
      } else if (/video/.test(mime)) {
        return await conn.sendMessage(m.chat, { video: media, caption: mensaje, mimetype: 'video/mp4', ...options });
      } else if (/audio/.test(mime)) {
        return await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg', ptt: true, ...options });
      } else if (/sticker/.test(mime)) {
        return await conn.sendMessage(m.chat, { sticker: media, ...options });
      }
    } else {
      // 💬 Si el citado es texto plano
      const citado = quoted.text || quoted.body || mensaje;
      return await conn.sendMessage(m.chat, { text: citado || mensaje, mentions: users }, options);
    }
  }

  // Si no hay mensaje citado, pero hay texto
  if (!mensaje) return;

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: users
  }, { quoted: m });
};

handler.help = ['hidetag'];
handler.tags = ['group'];
handler.command = /^(hidetag|notify|noti|notificar|n)$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;