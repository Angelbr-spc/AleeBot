
import fetch from 'node-fetch';

const handler = async (m, { conn, args}) => {
  if (!args[0]) {
    return m.reply('🚩 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐩𝐫𝐨𝐩𝐨𝐫𝐜𝐢𝐨𝐧𝐚 𝐮𝐧 𝐭𝐞𝐱𝐭𝐨 𝐩𝐚𝐫𝐚 𝐠𝐞𝐧𝐞𝐫𝐚𝐫 𝐞𝐥 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐚𝐧𝐢𝐦𝐚𝐝𝐨.\𝐧_𝐄𝐣𝐞𝐦𝐩𝐥𝐨:.𝐛𝐫𝐚𝐭𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐇𝐨𝐥𝐚 𝐦𝐮𝐧𝐝𝐨_');
}

  const text = args.join(' ');
  const apiUrl = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(text)}`;

  try {
    m.reply('⏳ 𝐆𝐞𝐧𝐞𝐫𝐚𝐧𝐝𝐨 𝐭𝐮 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐚𝐧𝐢𝐦𝐚𝐝𝐨, 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐞𝐬𝐩𝐞𝐫𝐚 𝐮𝐧 𝐦𝐨𝐦𝐞𝐧𝐭𝐨...');

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error al generar el sticker: ${response.statusText}`);

    const buffer = await response.buffer();

    await conn.sendFile(m.chat, buffer, 'bratsticker.webp', '', m, { asSticker: true});
} catch (error) {
    console.error('Error al generar el sticker:', error);
    m.reply('🚩 𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐠𝐞𝐧𝐞𝐫𝐚𝐫 𝐞𝐥 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐚𝐧𝐢𝐦𝐚𝐝𝐨. 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.');
}
};

handler.command = ['bratv', 'stickerbrat'];
export default handler;