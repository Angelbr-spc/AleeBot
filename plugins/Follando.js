const handler = async (m, { conn, args, text }) => {
  console.log('[✅ Comando .admin detectado]');

  if (m.isGroup) return m.reply('❗Este comando solo se usa en *privado*.');

  const ownerJids = global.owner.map(([v]) => v + '@s.whatsapp.net');
  if (!ownerJids.includes(m.sender)) return m.reply('🚫 Solo el owner puede usar este comando.');

  const enlace = args[0] || text;
  if (!enlace || !enlace.includes('chat.whatsapp.com/')) {
    return m.reply('🔗 Debes enviar el link del grupo.\nEjemplo:\n.admin https://chat.whatsapp.com/xxxxxxx');
  }

  try {
    const code = enlace.trim().split('/').pop().replace(/\s+/g, '');
    const info = await conn.groupGetInviteInfo(code);
    const jid = info.id + '@g.us';

    const metadata = await conn.groupMetadata(jid).catch(() => null);
    if (!metadata) return m.reply('❌ El bot NO está en ese grupo.');

    const participantes = metadata.participants.map(p => p.id);
    if (!participantes.includes(m.sender)) {
      return m.reply('🚷 No estás en ese grupo. Únete primero para recibir admin.');
    }

    const botParticipant = metadata.participants.find(p => p.id === conn.user.jid);
    if (!botParticipant?.admin) {
      return m.reply('🔒 El bot NO es admin en ese grupo.');
    }

    await conn.groupParticipantsUpdate(jid, [m.sender], 'promote');

    await conn.sendMessage(m.chat, {
      text: `✅ Ahora eres admin en *${info.subject}*`,
      contextInfo: {
        externalAdReply: {
          title: info.subject,
          body: '🔧 Admin otorgado por BARBOZA BOT',
          mediaType: 1,
          thumbnailUrl: info.icon || 'https://i.imgur.com/9N1mUu5.png',
          sourceUrl: `https://chat.whatsapp.com/${code}`,
          showAdAttribution: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error('[❌ ERROR EN .admin]', e);
    return m.reply('❌ No pude darte admin. Asegúrate de:\n✅ Estás en el grupo\n✅ El bot también\n✅ El bot es admin\n✅ El link es válido');
  }
};

handler.command = /^\.?admin$/i;
handler.owner = true;
handler.private = true;

export default handler;