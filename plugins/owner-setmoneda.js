let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('⚡ 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐩𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧𝐚 𝐮𝐧 𝐧𝐨𝐦𝐛𝐫𝐞 𝐩𝐚𝐫𝐚 𝐞𝐥 𝐛𝐨𝐭.\𝐧> 𝐄𝐣𝐞𝐦𝐩𝐥𝐨: #𝐬𝐞𝐭𝐦𝐨𝐧𝐞𝐝𝐚 𝐂𝐨𝐢𝐧𝐬');

  global.moneda = text.trim();

  m.reply(`👑 La moneda del bot ha sido cambiado a: ${global.moneda}`);
};

handler.help = ['setmoneda'];
handler.tags = ['tools'];
handler.command = ['setmoneda'];
handler.rowner = true;

export default handler;