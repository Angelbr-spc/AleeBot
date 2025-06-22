
let handler = async (m, { conn, args }) => {
    // Verificar si se menciona a un usuario
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ 𝐃𝐞𝐛𝐞𝐬 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨. 𝐔𝐬𝐚 𝐞𝐥 𝐟𝐨𝐫𝐦𝐚𝐭𝐨: .𝐠𝐨𝐫𝐝𝐨𝐭𝐞𝐭𝐨𝐧 @𝐮𝐬𝐮𝐚𝐫𝐢𝐨" }, { quoted: m });
    }

    // Obtener el ID del usuario mencionado
    let userMentioned = m.mentionedJid[0];
    
    // Generar un porcentaje aleatorio entre 1 y 100
    let porcentaje = Math.floor(Math.random() * 100) + 1;

    // Mensaje que se enviará
    const mensaje = `🤣 ¡${conn.getName(userMentioned)} tiene un ${porcentaje}% de ser gordoteton! ¡No te lo tomes a mal!`;

    // Enviar el mensaje al chat
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
}
handler.help = ['gordoteton @usuario'];
handler.tags = ['diversión'];
handler.command = ['gordoteton'];

export default handler;