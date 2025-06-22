
const handler = async (m, { conn, text}) => {
    try {
        if (!text) return m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:* 𝐃𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐞𝐥 𝐧𝐮𝐞𝐯𝐨 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐬𝐩𝐮é𝐬 𝐝𝐞 `.𝐧𝐞𝐰𝐧𝐚𝐦𝐞`.');

        await conn.updateProfileName(text);

        if (conn.authState.creds.me.id) {
            await conn.updateProfileName(text);
}

        m.reply(`✅ *¡Nombre cambiado exitosamente!* 😃✨\n📌 *Nuevo nombre:* ${text}`);

} catch (error) {
        console.error(error);
        m.reply(`⚠️ *Error:* No se pudo cambiar el nombre. 🛑\n${error.message}`);
}
};

handler.command = /^newname$/i;
handler.tags = ['info']
export default handler;