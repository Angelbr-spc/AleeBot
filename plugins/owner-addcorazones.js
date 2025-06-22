import db from '../lib/database.js'

import MessageType from '@whiskeysockets/baileys'
let impts = 0
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return m.reply('⚠️️ *𝐓𝐚𝐠𝐮𝐞𝐚 𝐚𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨*')
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) return m.reply('⚠️️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞 *𝐜𝐨𝐫𝐚𝐳𝐨𝐧𝐞𝐬* 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 𝐚ñ𝐚𝐝𝐢𝐫')
    if (isNaN(txt)) return m.reply('⚠️ *𝐬ó𝐥𝐨 𝐧ú𝐦𝐞𝐫𝐨𝐬*')
    let dmt = parseInt(txt)
    let corazones = dmt
    let pjk = Math.ceil(dmt * impts)
    corazones += pjk
    if (corazones < 1) return m.reply('⚠️️ 𝐌í𝐧𝐢𝐦𝐨 𝐞𝐬  *1*')
    let users = global.db.data.users
   users[who].corazones += dmt

    await conn.reply(m.chat, `⊜ *🤍 AÑADIDO*
┏━━━━━━━━━━━⬣
┃⋄ *Total:* ${dmt}
┗━━━━━━━━━━━⬣`, m, )
   conn.fakeReply(m.chat, `⊜ *_Recibiste_* \n\n *_+${dmt} corazones 🤍_*`, who, m.text)
}

handler.help = ['addcorazones *<@user>*']
handler.tags = ['owner']
handler.command = ['addcorazones'] 
handler.rowner = true

export default handler