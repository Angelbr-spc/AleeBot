const handler = async (m, { conn, args, text }) => {
  console.log('[✅ Comando .admin detectado]');

  if (m.isGroup) return m.reply('❗𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐬𝐞 𝐮𝐬𝐚 𝐞𝐧 *𝐩𝐫𝐢𝐯𝐚𝐝𝐨*.');

  const ownerJids = global.owner.map(([v]) => v + '@s.whatsapp.net');
  if (!ownerJids.includes(m.sender)) return m.reply('🚫 𝐒𝐨𝐥𝐨 𝐞𝐥 𝐨𝐰𝐧𝐞𝐫 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.');

  const enlace = args[0] || text;
  if (!enlace || !enlace.includes('chat.whatsapp.com/')) {
    return m.reply('🔗 𝐃𝐞𝐛𝐞𝐬 𝐞𝐧𝐯𝐢𝐚𝐫 𝐞𝐥 𝐥𝐢𝐧𝐤 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.\𝐧𝐄𝐣𝐞𝐦𝐩𝐥𝐨:\𝐧.𝐚𝐝𝐦𝐢𝐧 𝐡𝐭𝐭𝐩𝐬://𝐜𝐡𝐚𝐭.𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩.𝐜𝐨𝐦/𝐱𝐱𝐱𝐱𝐱𝐱𝐱');
  }

  try {
    const code = enlace.trim().split('/').pop().replace(/\s+/g, '');
    const info = await conn.groupGetInviteInfo(code);
    const jid = info.id + '@g.us';

    const metadata = await conn.groupMetadata(jid).catch(() => null);
    if (!metadata) return m.reply('❌ 𝐄𝐥 𝐛𝐨𝐭 𝐍𝐎 𝐞𝐬𝐭á 𝐞𝐧 𝐞𝐬𝐞 𝐠𝐫𝐮𝐩𝐨.');

    const participantes = metadata.participants.map(p => p.id);
    if (!participantes.includes(m.sender)) {
      return m.reply('🚷 𝐍𝐨 𝐞𝐬𝐭á𝐬 𝐞𝐧 𝐞𝐬𝐞 𝐠𝐫𝐮𝐩𝐨. Ú𝐧𝐞𝐭𝐞 𝐩𝐫𝐢𝐦𝐞𝐫𝐨 𝐩𝐚𝐫𝐚 𝐫𝐞𝐜𝐢𝐛𝐢𝐫 𝐚𝐝𝐦𝐢𝐧.');
    }

    const botParticipant = metadata.participants.find(p => p.id === conn.user.jid);
    if (!botParticipant?.admin) {
      return m.reply('🔒 𝐄𝐥 𝐛𝐨𝐭 𝐍𝐎 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐞𝐧 𝐞𝐬𝐞 𝐠𝐫𝐮𝐩𝐨.');
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
    return m.reply('❌ 𝐍𝐨 𝐩𝐮𝐝𝐞 𝐝𝐚𝐫𝐭𝐞 𝐚𝐝𝐦𝐢𝐧. 𝐀𝐬𝐞𝐠ú𝐫𝐚𝐭𝐞 𝐝𝐞:\𝐧✅ 𝐄𝐬𝐭á𝐬 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨\𝐧✅ 𝐄𝐥 𝐛𝐨𝐭 𝐭𝐚𝐦𝐛𝐢é𝐧\𝐧✅ 𝐄𝐥 𝐛𝐨𝐭 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧\𝐧✅ 𝐄𝐥 𝐥𝐢𝐧𝐤 𝐞𝐬 𝐯á𝐥𝐢𝐝𝐨');
  }
};

handler.command = /^\.?admin$/i;
handler.owner = true;
handler.private = true;

export default handler;