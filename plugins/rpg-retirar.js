

let handler = async (m, { args }) => {
   let user = global.db.data.users[m.sender]
   if (!args[0]) return m.reply('🚩 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞 *❇️ 𝐄𝐫𝐢𝐬* 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚𝐬 𝐑𝐞𝐭𝐢𝐫𝐚𝐫.')
   if (args[0] == 'all') {
      let count = parseInt(user.bank)
      user.bank -= count * 1
      user.limit += count * 1
      await m.reply(`🚩 Retiraste *${count} ❇️ Eris* del Banco.`)
      return !0
   }
   if (!Number(args[0])) return m.reply('🚩 𝐋𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞𝐯𝐞 𝐬𝐞𝐫 𝐮𝐧 𝐍𝐮𝐦𝐞𝐫𝐨.')
   let count = parseInt(args[0])
   if (!user.bank) return m.reply('𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 *❇️ 𝐄𝐫𝐢𝐬* 𝐞𝐧 𝐞𝐥 𝐁𝐚𝐧𝐜𝐨.')
   if (user.bank < count) return m.reply(`Solo tienes *${user.bank} ❇️ Eris* en el Banco.`)
   user.bank -= count * 1
   user.limit += count * 1
   await m.reply(`🚩 Retiraste *${count} ❇️ Eris* del Banco.`)
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'wd']
handler.register = true 
export default handler