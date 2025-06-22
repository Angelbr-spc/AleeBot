
const handler = async (m, { conn, args }) => {
    // Verificamos si se han proporcionado argumentos
    if (!args[0] || !args[1]) {
        return conn.sendMessage(m.chat, { text: "𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐮𝐬𝐚 𝐞𝐥 𝐟𝐨𝐫𝐦𝐚𝐭𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨: .𝐪𝐮𝐢𝐭𝐚𝐫𝐝𝐮𝐥𝐜𝐞𝐬 <𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝> @𝐮𝐬𝐮𝐚𝐫𝐢𝐨" }, { quoted: m });
    }

    const cantidad = parseInt(args[0]); // Convertimos la cantidad a número
    const usuarioID = args[1]; // ID del usuario al que le quieres quitar los dulces

    // Validamos la cantidad
    if (isNaN(cantidad) || cantidad <= 0) {
        return conn.sendMessage(m.chat, { text: "𝐋𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞𝐛𝐞 𝐬𝐞𝐫 𝐮𝐧 𝐧ú𝐦𝐞𝐫𝐨 𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨." }, { quoted: m });
    }

    // Obtenemos el usuario objetivo
    const targetUser = global.db.data.users[usuarioID];
    
    if (!targetUser) {
        return conn.sendMessage(m.chat, { text: "𝐄𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐞𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚𝐝𝐨 𝐧𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫ó." }, { quoted: m });
    }

    // Verificamos si el usuario tiene suficientes dulces
    if (targetUser.dulce < cantidad) {
        return conn.sendMessage(m.chat, { text: "𝐄𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐧𝐨 𝐭𝐢𝐞𝐧𝐞 𝐬𝐮𝐟𝐢𝐜𝐢𝐞𝐧𝐭𝐞𝐬 𝐝𝐮𝐥𝐜𝐞𝐬 𝐩𝐚𝐫𝐚 𝐪𝐮𝐢𝐭𝐚𝐫." }, { quoted: m });
    }

    // Restamos la cantidad de dulces
    targetUser.dulce -= cantidad; 
    const message = `🚩 Se le han quitado ${cantidad} dulces a *@${usuarioID.split('@')[0]}*. Ahora tiene ${targetUser.dulce} dulces restantes.`;

    try {
        await conn.sendMessage(m.chat, { text: message, mentions: [usuarioID] }, { quoted: m });
        console.log(`Se han quitado ${cantidad} dulces a ${usuarioID}`); 
    } catch (error) {
        console.error("Error al quitar los dulces:", error);
        await conn.sendMessage(m.chat, { text: "𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐪𝐮𝐢𝐭𝐚𝐫 𝐥𝐨𝐬 𝐝𝐮𝐥𝐜𝐞𝐬. 𝐈𝐧𝐭𝐞𝐧𝐭𝐚 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞." }, { quoted: m });
    }
};

handler.help = ['quitardulces <cantidad> <@usuario>'];
handler.tags = ['admin'];
handler.command = /^(quitardulces)$/i;
handler.admin = true; // Solo los administradores pueden usar este comando
handler.fail = null;

export default handler;