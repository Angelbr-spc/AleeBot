import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('✍️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞 *𝐘𝐞𝐧𝐞𝐬 💴* 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚𝐬 𝐃𝐞𝐩𝐨𝐬𝐢𝐭𝐚𝐫.')
if ((args[0]) < 1) return m.reply('✍️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐯á𝐥𝐢𝐝𝐚 𝐝𝐞 *𝐘𝐞𝐧𝐞𝐬 💴*.')
if (args[0] == 'all') {
let count = parseInt(user.yenes)
user.yenes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} Yenes 💴* al Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('🔢 𝐋𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞𝐯𝐞 𝐬𝐞𝐫 𝐮𝐧 𝐍𝐮𝐦𝐞𝐫𝐨.')
let count = parseInt(args[0])
if (!user.yenes) return m.reply('𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 *𝐘𝐞𝐧𝐞𝐬 💴* 𝐞𝐧 𝐥𝐚 𝐂𝐚𝐫𝐭𝐞𝐫𝐚.')
if (user.yenes < count) return m.reply(`Solo tienes *${user.yenes} Yenes 💴* en la Cartera.`)
user.yenes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} Yenes 💴* al Banco.`)}

handler.help = ['depositar']
handler.tags = ['economy']
handler.command = ['deposit', 'depositar', 'd', 'dep', 'aguardar']
handler.group = true;
handler.register = true
export default handler 