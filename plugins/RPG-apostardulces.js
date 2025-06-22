
let handler = async (m, { conn, args }) => {
    // Verifica que el usuario ha proporcionado una cantidad de dulces y un usuario
    if (isNaN(args[0]) || !m.mentionedJidList[0]) {
        return m.reply("𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐞𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚 𝐥𝐚 𝐜𝐚𝐧𝐭𝐢𝐝𝐚𝐝 𝐝𝐞 𝐝𝐮𝐥𝐜𝐞𝐬 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚𝐬 𝐚𝐩𝐨𝐬𝐭𝐚𝐫 𝐲 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨.");
    }

    let apuesta = parseInt(args[0]);
    let rival = m.mentionedJidList[0]; // El usuario mencionado

    // Verifica si el usuario tiene suficientes dulces
    let userDulces = global.db.data.users[m.sender].dulces || 1; // Cambia esto según cómo almacenes los dulces
    if (userDulces < apuesta) {
        return m.reply(`No tienes suficientes dulces. Tienes ${userDulces} dulces.`);
    }

    // Verifica si el rival tiene suficientes dulces
    let rivalDulces = global.db.data.users[rival]?.dulces || 1; // Asegúrate de que el rival tenga la propiedad 'dulces'
    if (rivalDulces < apuesta) {
        return m.reply(`El usuario mencionado no tiene suficientes dulces. Tiene ${rivalDulces} dulces.`);
    }

    // Resta los dulces apostados del usuario y del rival
    global.db.data.users[m.sender].dulces -= apuesta;
    global.db.data.users[rival].dulces -= apuesta;

    // Selecciona aleatoriamente un ganador
    let participantes = [m.sender, rival];
    let ganador = participantes[Math.floor(Math.random() * participantes.length)];

    // El ganador recibe los dulces apostados
    global.db.data.users[ganador].dulces += apuesta * 2; // El ganador recibe el total de la apuesta

    // Mensaje de resultado
    await conn.sendMessage(m.chat, {
        text: `🎉 ¡Felicidades! ${ganador} ha ganado ${apuesta * 2} dulces. 🎉`
    }, { quoted: m });
};

handler.help = ['apostardulces <cantidad> @usuario'];
handler.tags = ['juegos'];
handler.command = ['apostardulces'];

export default handler;