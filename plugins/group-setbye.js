let handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
global.db.data.chats[m.chat].sBye = text
conn.reply(m.chat, `*LA DESPEDIDA DEL GRUPO HA SIDO CONFIGURADA*`, m)  

} else {
    conn.reply(m.chat, `𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐞𝐥 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐃𝐞𝐬𝐩𝐞𝐝𝐢𝐝𝐚 𝐄𝐣𝐞𝐦𝐩𝐥𝐨:
.𝐬𝐞𝐭𝐛𝐲𝐞 𝐀𝐝𝐢𝐨𝐬 𝐩𝐮𝐭𝐨 👑`, m)
}
}

handler.help = ['setbye @user + texto']
handler.tags = ['group']
handler.command = ['setbye', 'despedida'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler