
const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('*👑 𝐘𝐀 𝐄𝐑𝐄𝐒 𝐂𝐇𝐀𝐍𝐆𝐎 𝐏𝐀𝐓𝐑𝐎𝐍!*');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
   m.reply('*👑 𝐘𝐀 𝐄𝐑𝐄𝐒 𝐂𝐇𝐀𝐍𝐆𝐎!*');
    let nn = conn.getName(m.sender);
     conn.reply('');
  } catch {
    m.reply('*👑 𝐘𝐀 𝐄𝐑𝐄𝐒 𝐂𝐇𝐀𝐍𝐆𝐎!*');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin' ,'tenerpoder'];
handler.mods = true;
handler.group = true;
handler.botAdmin = true;
export default handler;