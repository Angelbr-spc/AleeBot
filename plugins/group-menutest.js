let handler = async (m, { conn }) => {
  try {
    await conn.sendMessage(m.chat, {
      video: { url: "https://v3.anonfiles.com/C8C5E9F0x4/1a3d8e7e-1718621532/menu_gif.mp4" },
      gifPlayback: true,
      caption: "✔️ Prueba con menú corto",
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Test error:\n' + e.message, m);
  }
};

handler.command = ['menutest'];
export default handler;