import yts from 'yt-search'
import axios from 'axios'

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply('📥 *Pikachu-Bot*\n\n📌 Escribe el nombre de la canción.\n\n*Ejemplo:* .play Shakira - Acróstico')

  await m.react('🔎')

  try {
    const search = await yts(text)
    const vid = search.videos[0]
    if (!vid) return m.reply('❌ No encontré ningún video con ese nombre.')

    const { title, url, thumbnail, timestamp, ago, views } = vid

    const res = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=mp3&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`)
    const { success, id, info } = res.data || {}

    if (!success) throw new Error('❌ No se pudo obtener el audio.')

    let link
    for (let i = 0; i < 10; i++) {
      const progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`)
      if (progress.data?.progress === 1000 && progress.data?.download_url) {
        link = progress.data.download_url
        break
      }
      await new Promise(res => setTimeout(res, 1200)) // Esperar 1.2s entre cada intento
    }

    if (!link) return m.reply('⚠️ Tardó mucho en procesar el audio.')

    await m.react('🎧')

    await conn.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "Descargado por Pikachu-Bot",
          thumbnail: await (await conn.getFile(thumbnail)).data,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: url
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar el audio.')
  }
}

handler.command = ['play']
export default handler