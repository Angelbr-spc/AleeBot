
const handler = async (m, { conn, participants }) => {
    if (!m.isGroup) return m.reply("❌ *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫𝐬𝐞 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*");

    if (!participants || participants.length === 0) return m.reply("⚠️ *𝐍𝐨 𝐡𝐚𝐲 𝐬𝐮𝐟𝐢𝐜𝐢𝐞𝐧𝐭𝐞𝐬 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐞𝐬 𝐩𝐚𝐫𝐚 𝐥𝐚 𝐫𝐮𝐥𝐞𝐭𝐚.*");

    const miembros = participants.filter(p => !p.admin && p.id);
    if (miembros.length === 0) return m.reply("⚠️ *𝐍𝐨 𝐡𝐚𝐲 𝐬𝐮𝐟𝐢𝐜𝐢𝐞𝐧𝐭𝐞𝐬 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬 𝐧𝐨 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐚𝐫𝐚 𝐣𝐮𝐠𝐚𝐫.*");

    const ganador = miembros[Math.floor(Math.random() * miembros.length)];
    const nombreGanador = await conn.getName(ganador.id);

    await m.reply(`
🎰 **¡La ruleta ha girado!** 🎰  
🏆 *Felicitaciones, ${nombreGanador}! Eres el ganador.*  
🎊 Disfruta tu victoria y compártela con el grupo!
`, false, { mentions: [ganador.id] });
};

handler.command = ['ruleta'];
export default handler;

