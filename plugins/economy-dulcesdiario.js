
let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    // Obtener la fecha actual
    let today = new Date().toDateString();

    // Verificar si el usuario ya reclamó sus dulces hoy
    if (user.lastClaimedDulce === today) {
        return m.reply("🚫 𝐘𝐚 𝐡𝐚𝐬 𝐫𝐞𝐜𝐥𝐚𝐦𝐚𝐝𝐨 𝐭𝐮𝐬 𝐝𝐮𝐥𝐜𝐞𝐬 𝐡𝐨𝐲. 𝐕𝐮𝐞𝐥𝐯𝐞 𝐦𝐚ñ𝐚𝐧𝐚 𝐩𝐚𝐫𝐚 𝐫𝐞𝐜𝐢𝐛𝐢𝐫 𝐦á𝐬.");
    }

    // Cantidad de dulces a ganar
    let dulceGanados = 10; // Puedes cambiar esta cantidad

    // Sumar los dulces ganados al usuario
    user.dulce = (user.dulce || 0) + dulceGanados;

    // Actualizar la fecha de la última reclamación
    user.lastClaimedDulces = today;

    // Respuesta al usuario
    await m.reply(`✅ Has ganado ${dulceGanados} dulces. Ahora tienes ${user.dulce} dulces.`);
}

handler.help = ['dulcesdiario'];
handler.tags = ['economía'];
handler.command = ['dulcesdiario'];

export default handler;
