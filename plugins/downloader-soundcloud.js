import yts from 'yt-search'
import axios from 'axios'

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply('📥 *𝐏𝐢𝐤𝐚𝐜𝐡𝐮-𝐁𝐨𝐭*\𝐧\𝐧📌 𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐥𝐚 𝐜𝐚𝐧𝐜𝐢ó𝐧.\𝐧\𝐧*𝐄𝐣𝐞𝐦𝐩𝐥𝐨:* .𝐩𝐥𝐚𝐲 𝐒𝐡𝐚𝐤𝐢𝐫𝐚 - 𝐀𝐜𝐫ó𝐬𝐭𝐢𝐜𝐨')

  await m.react('🔎')

  try {
    const search = await yts(text)
    const vid = search.videos[0]
    if (!vid) return m.reply('❌ 𝐍𝐨 𝐞𝐧𝐜𝐨𝐧𝐭𝐫é 𝐧𝐢𝐧𝐠ú𝐧 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐧 𝐞𝐬𝐞 𝐧𝐨𝐦𝐛𝐫𝐞.')

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

    if (!link) return m.reply('⚠️ 𝐓𝐚𝐫𝐝ó 𝐦𝐮𝐜𝐡𝐨 𝐞𝐧 𝐩𝐫𝐨𝐜𝐞𝐬𝐚𝐫 𝐞𝐥 𝐚𝐮𝐝𝐢𝐨.')

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
    m.reply('❌ 𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐩𝐫𝐨𝐜𝐞𝐬𝐚𝐫 𝐞𝐥 𝐚𝐮𝐝𝐢𝐨.')
  }
}

handler.command = ['play']
export default handler