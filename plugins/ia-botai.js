
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply('🚩 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐩𝐚𝐫𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐛𝐨𝐭 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐚.\𝐧📌 𝐄𝐣𝐞𝐦𝐩𝐥𝐨: `.𝐛𝐨𝐭𝐚𝐢 𝐇𝐨𝐥𝐚, ¿𝐜ó𝐦𝐨 𝐞𝐬𝐭á𝐬?`');
  }

  const text = args.join(' ');
  const apiUrl = `https://api.nekorinn.my.id/ai/chatbot?ai_name=𝐀𝐥𝐞𝐞𝐁𝐨𝐭 👑&text=${encodeURIComponent(text)}`;

  try {
    m.reply('🤖 𝐆𝐞𝐧𝐞𝐫𝐚𝐧𝐝𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚...');
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    const json = await response.json();
    if (json && json.data) {
      await conn.sendMessage(m.chat, { text: `🤖 *𝐀𝐥𝐞𝐞𝐁𝐨𝐭 👑 dice:* ${json.data}` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: "❌ 𝐍𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚 𝐝𝐞 𝐥𝐚 𝐈𝐀." }, { quoted: m });
    }
  } catch (error) {
    console.error('❌ Error en la solicitud:', error);
    m.reply('🚩 𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.');
  }
};

handler.command = ['botai'];
export default handler;