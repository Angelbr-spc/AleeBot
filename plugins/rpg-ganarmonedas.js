
let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    // Obtener la fecha actual
    let today = new Date().toDateString();

    // Verificar si el usuario ya reclamó sus monedas hoy
    if (user.lastClaimedMonedas === today) {
        return m.reply("🚫 𝐘𝐚 𝐡𝐚𝐬 𝐫𝐞𝐜𝐥𝐚𝐦𝐚𝐝𝐨 𝐭𝐮𝐬 𝐦𝐨𝐧𝐞𝐝𝐚𝐬 𝐡𝐨𝐲. 𝐕𝐮𝐞𝐥𝐯𝐞 𝐦𝐚ñ𝐚𝐧𝐚 𝐩𝐚𝐫𝐚 𝐫𝐞𝐜𝐢𝐛𝐢𝐫 𝐦á𝐬.");
    }

    // Cantidad de monedas a ganar
    let monedasGanadas = 15; // Puedes cambiar esta cantidad

    // Sumar las monedas ganadas al usuario
    user.monedas = (user.monedas || 0) + monedasGanadas;

    // Actualizar la fecha de la última reclamación
    user.lastClaimedMonedas = today;

    // Respuesta al usuario
    await m.reply(`✅ Has ganado ${monedasGanadas} monedas. Ahora tienes ${user.monedas} monedas.`);
}

handler.help = ['ganarmonedas'];
handler.tags = ['economía'];
handler.command = ['ganarmonedas'];

export default handler;