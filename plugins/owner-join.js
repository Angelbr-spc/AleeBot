let handler = async (m, { conn, text }) => {
  // Expresión rápida para extraer el código del grupo desde el link
  let [_, code] = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/) || []

  if (!code) return m.reply('*❌ 𝐄𝐧𝐥𝐚𝐜𝐞 𝐢𝐧𝐯á𝐥𝐢𝐝𝐨.*')

  // Unión inmediata al grupo
  await conn.groupAcceptInvite(code)
    .then(() => m.reply('*✅ 𝐔𝐧𝐢𝐝𝐨 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨.*'))
    .catch(() => m.reply('*❌ 𝐅𝐚𝐥𝐥ó 𝐥𝐚 𝐮𝐧𝐢ó𝐧 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨.*'))
}

handler.command = /^join$/i
handler.rowner = true // Solo dueño del bot
export default handler