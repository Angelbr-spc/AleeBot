let handler = async (m, { command }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return m.reply("❌ 𝐍𝐨 𝐞𝐬𝐭á𝐬 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 𝐞𝐥 𝐬𝐢𝐬𝐭𝐞𝐦𝐚.");

    // Reiniciar valores del usuario
    global.db.data.users[m.sender] = {
        ...user, // Mantiene otros datos si los hay
        diamantes: 0,
        dulces: 0,
        xp: 0,
        mascota: null
    };

    return m.reply("🗑️ *𝐒𝐞 𝐡𝐚𝐧 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐝𝐨 𝐭𝐮𝐬 𝐝𝐚𝐭𝐨𝐬 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞:*\𝐧💎 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞𝐬: 0\𝐧🍬 𝐃𝐮𝐥𝐜𝐞𝐬: 0\𝐧🎖️ 𝐗𝐏: 0\𝐧🐾 𝐌𝐚𝐬𝐜𝐨𝐭𝐚: 𝐍𝐢𝐧𝐠𝐮𝐧𝐚");
};

handler.command = /^delete$/i;
export default handler;