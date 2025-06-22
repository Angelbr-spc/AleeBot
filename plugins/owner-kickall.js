const handler = async (m, { conn, participants }) => {
  const texto = m.text?.toLowerCase().trim()
  if (!['kickall', 'banall', 'kikoall'].includes(texto)) return

  const botJid = conn.user.jid
  const sender = m.sender
  const owners = global.owner?.map(([v]) => v) || []

  const admins = participants.filter(p => p.admin).map(p => p.id)
  const botIsAdmin = admins.includes(botJid)
  const userIsAdmin = admins.includes(sender)

  if (!userIsAdmin) return m.reply('🚫 𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 *𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬* 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.')
  if (!botIsAdmin) return m.reply('🤖 𝐍𝐞𝐜𝐞𝐬𝐢𝐭𝐨 𝐬𝐞𝐫 *𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫* 𝐩𝐚𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐫 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬.')

  const expulsar = participants
    .filter(p =>
      p.id !== botJid &&
      p.id !== sender &&
      !p.admin &&
      !owners.includes(p.id)
    )
    .map(p => p.id)

  if (!expulsar.length) return m.reply('✅ 𝐍𝐨 𝐡𝐚𝐲 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬 𝐩𝐚𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐫.')

  try {
    await conn.groupParticipantsUpdate(m.chat, expulsar, 'remove')
    await m.reply(`✅ Se expulsaron a *${expulsar.length}* miembros del grupo.\n\n𝐕𝐀𝐂𝐈𝐀𝐍𝐃𝐎 𝐄𝐋 𝐁𝐀𝐒𝐔𝐑𝐄𝐑𝐎 🧹🔥`)
  } catch (e) {
    console.error('❌ Error al expulsar:', e)
    await m.reply('⚠️ 𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐫 𝐚 𝐥𝐨𝐬 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬.')
  }
}

handler.customPrefix = /^kickall$|^banall$|^kikoall$/i
handler.command = new RegExp
handler.group = true
handler.botAdmin = true

export default handler