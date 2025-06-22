
let handler = async (m, { conn, args }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    // Verificar que se haya proporcionado un argumento para el canje
    if (!args[0] || isNaN(args[0])) {
        return m.reply("⚠️ 𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐝𝐢𝐜𝐚 𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞 𝐜𝐚𝐫𝐚𝐦𝐞𝐥𝐨𝐬 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚𝐬 𝐜𝐚𝐧𝐣𝐞𝐚𝐫.");
    }

    let cantidadACanjear = parseInt(args[0]);

    // Verificar que el usuario tenga suficientes caramelos
    if (user.caramelos < cantidadACanjear) {
        return m.reply(`🚫 No tienes suficientes caramelos. Tienes ${user.caramelos} caramelos.`);
    }

    // Aquí puedes definir qué obtiene el usuario al canjear
    let premio = "un descuento especial"; // Cambia esto por lo que desees

    // Restar los caramelos del usuario
    user.caramelos -= cantidadACanjear;

    // Respuesta al usuario
    await m.reply(`✅ Has canjeado ${cantidadACanjear} caramelos y recibes ${premio}. Ahora tienes ${user.caramelos} caramelos.`);
}

handler.help = ['canjearcaramelos <cantidad>'];
handler.tags = ['economía'];
handler.command = ['canjearcaramelos'];

export default handler;