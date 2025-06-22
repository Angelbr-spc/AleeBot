import _ from "lodash"
import fetch from "node-fetch"

let handler = async (m, { conn, command, usedPrefix, args }) => {
try {

const text = _.get(args, "length") ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || ""

if (!text.trim()) {
return m.reply(`✦ Por favor, ingresa el nombre de la música.`)
}

await m.reply("✦ 𝐄𝐬𝐩𝐞𝐫𝐞 𝐮𝐧 𝐦𝐨𝐦𝐞𝐧𝐭𝐨...")

const searchResponse = await fetch(`https://deliriussapi-oficial.vercel.app/search/spotify?q=${encodeURIComponent(text)}`)
const searchResult = await searchResponse.json()

if (!searchResult.status || !searchResult.data.length) {
return m.reply("✦ 𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫𝐨𝐧 𝐫𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬 𝐩𝐚𝐫𝐚 𝐭𝐮 𝐜𝐨𝐧𝐬𝐮𝐥𝐭𝐚.")
}

const firstResult = searchResult.data[0]
const downloadResponse = await fetch(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${firstResult.url}`)
const downloadResult = await downloadResponse.json()

if (!downloadResult.status || !downloadResult.data) {
return m.reply("✦ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐞𝐥 𝐚𝐮𝐝𝐢𝐨. 𝐈𝐧𝐭é𝐧𝐭𝐚𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.")
}

const { title, author, url: downloadUrl, image } = downloadResult.data
const captvid = `*✦Título:* ${title || "No encontrado"}
*✧Popularidad:* ${firstResult.popularity || "No disponible"}
*✦Artista:* ${author || "No encontrado"}
*✧Álbum:* ${firstResult.album || "No disponible"}
*✦Duración:* ${firstResult.duration || "No disponible"}
*✦Publicado:* ${firstResult.publish || "No disponible"}
*✧Enlace Spotify:* ${firstResult.url || "No disponible"}`

const thumbnail = (await conn.getFile(image))?.data

const infoReply = {
contextInfo: {
externalAdReply: {
body: "✧ En unos momentos se entrega su audio",
mediaType: 1,
mediaUrl: firstResult.url,
previewType: 0,
renderLargerThumbnail: true,
sourceUrl: firstResult.url,
thumbnail: thumbnail,
title: "S P O T I F Y - A U D I O",
},},
}

await conn.reply(m.chat, captvid, m, infoReply)
infoReply.contextInfo.externalAdReply.body = "Audio descargado con éxito" // Para confirmar la descarga Jjjj

await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, caption: captvid, mimetype: "audio/mpeg", contextInfo: infoReply.contextInfo, }, { quoted: m }
)} catch (error) {
console.error("Error en el handler de Spotify:", error)
return m.reply("✦ 𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐩𝐫𝐨𝐜𝐞𝐬𝐚𝐫 𝐭𝐮 𝐬𝐨𝐥𝐢𝐜𝐢𝐭𝐮𝐝. 𝐈𝐧𝐭é𝐧𝐭𝐚𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.")
}}


handler.help = ["spotify"]
handler.tags = ["descarga"]
handler.command = ['splay', 'spotify']
handler.limit = true

export default handler