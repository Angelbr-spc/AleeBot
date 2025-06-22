let noAceptarHandler = async (m, { conn, text, usedPrefix, command }) => {
    if (!m.isGroup) return m.reply("❌ 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐬𝐞 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞𝐥 𝐬𝐭𝐚𝐟𝐟.");
    if (!m.quoted) return m.reply("❗️ 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐬𝐮𝐠𝐞𝐫𝐞𝐧𝐜𝐢𝐚 𝐩𝐚𝐫𝐚 𝐫𝐞𝐜𝐡𝐚𝐳𝐚𝐫𝐥𝐨.");
    
    let razon = text.trim() || "Sin razón especificada.";

    let regex = /wa\.me\/(\d+)/i;
    let match = m.quoted.text.match(regex);
    if (!match) {
        return m.reply("❗️ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐞𝐱𝐭𝐫𝐚𝐞𝐫 𝐞𝐥 𝐧ú𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐝𝐞 𝐥𝐚 𝐬𝐮𝐠𝐞𝐫𝐞𝐧𝐜𝐢𝐚.");
    }

    let userId = match[1] + "@s.whatsapp.net";

    await conn.reply(userId, `❌ *Tu sugerencia fue RECHAZADA*\n\n_El staff ha revisado tu propuesta y decidió no implementarla._\nRazón: ${razon}`, m);
    
    m.reply("✅ 𝐒𝐮𝐠𝐞𝐫𝐞𝐧𝐜𝐢𝐚 𝐫𝐞𝐜𝐡𝐚𝐳𝐚𝐝𝐚 𝐲 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐝𝐚 𝐚𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨.");
};

noAceptarHandler.help = ["noaceptar"];
noAceptarHandler.tags = ["staff"];
noAceptarHandler.command = ["noaceptar"];
noAceptarHandler.owner = true;

export default noAceptarHandler;