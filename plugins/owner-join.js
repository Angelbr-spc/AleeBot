let handler = async (m, { conn, text }) => {
  // Expresión rápida para extraer el código del grupo desde el link
  let [_, code] = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/) || []

  if (!code) return m.reply('*❌ Enlace inválido.*')

  // Unión inmediata al grupo
  await conn.groupAcceptInvite(code)
    .then(() => m.reply('*✅ Unido al grupo.*'))
    .catch(() => m.reply('*❌ Falló la unión al grupo.*'))
}

handler.command = /^join$/i
handler.rowner = true // Solo dueño del bot
export default handler