
let handler = async (m, { conn, args }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    // Verificar que se haya proporcionado la cantidad de monedas a quitar
    if (!args[0] || isNaN(args[0]) || args[0] <= 0) {
        return m.reply("⚠️ 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐝𝐢𝐜𝐚 𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞 𝐦𝐨𝐧𝐞𝐝𝐚𝐬 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚𝐬 𝐪𝐮𝐢𝐭𝐚𝐫.");
    }

    let cantidadAQuitar = parseInt(args[0]);

    // Verificar que el usuario tenga suficientes monedas
    if (user.monedas < cantidadAQuitar) {
        return m.reply(`🚫 No tienes suficientes monedas. Tienes ${user.monedas} monedas.`);
    }

    // Restar las monedas al usuario
    user.monedas -= cantidadAQuitar;

    // Respuesta al usuario
    await m.reply(`✅ Has quitado ${cantidadAQuitar} monedas. Ahora tienes ${user.monedas} monedas.`);
}

handler.help = ['quitarmonedas <cantidad>'];
handler.tags = ['economía'];
handler.command = ['quitarmonedas'];

export default handler;