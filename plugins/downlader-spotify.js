/* Hecho por Angel Brou mejorado por Deylin */

import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐥𝐚 𝐜𝐚𝐧𝐜𝐢𝐨𝐧 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚𝐬 👑.`);

  await m.react('🕒');
  conn.reply(m.chat, `*👑 𝐁𝐮𝐬𝐜𝐚𝐧𝐝𝐨 𝐬𝐮 𝐂𝐚𝐧𝐜𝐢𝐨𝐧 𝐝𝐞 𝐒𝐩𝐨𝐭𝐢𝐟𝐲...*`);

  try {
    let res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    let gyh = await res.json();

    if (!gyh.result || !gyh.result.downloadUrl) throw '𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨 𝐥𝐚 𝐂𝐚𝐧𝐜𝐢𝐨𝐧 𝐒𝐨𝐥𝐢𝐜𝐢𝐭𝐚𝐝𝐚 👑.';


    const search = await yts(text);
    if (!search.videos || search.videos.length === 0) throw '𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐑𝐞𝐥𝐚𝐜𝐢𝐨𝐧𝐚𝐝𝐨 👑.';

    const videoInfo = search.videos[0];
    const { title, thumbnail, timestamp: duration, views, ago, url } = videoInfo;

    const doc = {
      audio: { url: gyh.result.downloadUrl },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: `Duración: ${duration} | Reproducciones: ${views.toLocaleString()}`,
          sourceUrl: url,
          thumbnailUrl: thumbnail || "https://qu.ax/FxpUy.jpg",
          renderLargerThumbnail: true
        }
      }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });
    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('❌');
    conn.reply(m.chat, '𝐇𝐮𝐛𝐨 𝐮𝐧 𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐁𝐮𝐬𝐜𝐚𝐫 𝐥𝐚 𝐜𝐚𝐧𝐜𝐢𝐨𝐧 𝐒𝐨𝐥𝐢𝐜𝐢𝐭𝐚𝐝𝐚 👑.');
  }
};

handler.help = ['spotify *<texto>*'];
handler.tags = ['descargas'];
handler.command = ['spotify'];

export default handler;