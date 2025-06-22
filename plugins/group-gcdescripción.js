const handler = async (m, {conn, args}) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`);
  m.reply('*👑 𝐋𝐚 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢ó𝐧 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐬𝐞 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞*');
};
handler.help = ['groupdesc <text>'];
handler.tags = ['grupo'];
handler.command = ['gpdesc', 'groupdesc']
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;