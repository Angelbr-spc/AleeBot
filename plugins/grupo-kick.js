const handler = async (m, { conn, participants }) => {
  const texto = m.text?.toLowerCase().trim()

  const comandos = /^(?:\.?kick|\.?expulsar|\.?fuera|\.?sacar)(\s|$)/i
  if (!comandos.test(texto)) return

  if (!m.isGroup) return m.reply('🚫 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.')

  const botAdmin = participants.find(p => p.id === conn.user.jid)?.admin
  const userAdmin = participants.find(p => p.id === m.sender)?.admin
  if (!botAdmin) return m.reply('🤖 𝐍𝐞𝐜𝐞𝐬𝐢𝐭𝐨 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧 𝐩𝐚𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐫.')
  if (!userAdmin) return m.reply('🚷 𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.')

  // Detectar al usuario objetivo
  const mentioned = m.mentionedJid?.[0]
  const quoted = m.quoted?.sender
  const reenviado = m.msg?.contextInfo?.participant

  const target = mentioned || quoted || reenviado

  if (!target) return m.reply('❗ 𝐃𝐞𝐛𝐞𝐬 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐚𝐥𝐠𝐮𝐢𝐞𝐧 𝐩𝐚𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐫𝐥𝐨.')

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
  } catch {
    m.reply('⚠️ 𝐍𝐨 𝐩𝐮𝐝𝐞 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐫𝐥𝐨. 𝐓𝐚𝐥 𝐯𝐞𝐳 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧.')
  }
}

handler.customPrefix = /^\.?kick|\.?expulsar|\.?fuera|\.?sacar/i
handler.command = /^$/ // sin prefijo
handler.group = true

export default handler