
let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false
return conn.reply(m.chat, `*𝐁𝐨𝐫𝐫𝐚𝐝𝐨 𝐃𝐞 𝐥𝐚 𝐁𝐚𝐬𝐞 𝐝𝐞 𝐃𝐚𝐭𝐨𝐬 𝐃𝐞 𝐀𝐥𝐞𝐞 𝐁𝐨𝐭 👑.*`)

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler