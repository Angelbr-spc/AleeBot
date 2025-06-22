
let handler = async (m, { conn }) => {
    // React con un emoji al mensaje
    await m.react('👑');

    // Mensaje que se enviará
    const message = `
𝐏𝐑𝐄𝐂𝐈𝐎𝐒 𝐀𝐋𝐄𝐄 𝐁𝐎𝐓 👑



𝐂𝐎𝐍𝐓𝐀𝐌𝐎𝐒 𝐂𝐎𝐍 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐒𝐈𝐍 𝐏𝐑𝐄𝐅𝐈𝐉𝐎 👑



𝐌𝐄𝐍𝐒𝐔𝐀𝐋𝐈𝐃𝐀𝐃𝐄𝐒:

👑 1 𝐁𝐨𝐭,  𝐌𝐞𝐬 2$ (𝐃𝐨𝐥𝐚𝐫𝐞𝐬)
👑 2 𝐁𝐨𝐭𝐬 𝐌𝐞𝐧𝐬𝐮𝐚𝐥𝐞𝐬 3$ (𝐃𝐨𝐥𝐚𝐫𝐞𝐬) 


𝐏𝐄𝐑𝐌𝐀𝐍𝐄𝐍𝐓𝐄𝐒:

👑 1 𝐁𝐨𝐭 𝐏𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐞 5$ (𝐃𝐨𝐥𝐚𝐫𝐞𝐬) 
👑 2 𝐁𝐨𝐭𝐬 𝐏𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐞𝐬 8$ (𝐃𝐨𝐥𝐚𝐫𝐞𝐬)


𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐙𝐀𝐃𝐎𝐒:

👑 𝐁𝐨𝐭 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥𝐢𝐳𝐚𝐝𝐨 𝐚 𝐭𝐮 𝐠𝐮𝐬𝐭𝐨 10$ (𝐃𝐨𝐥𝐚𝐫𝐞𝐬)



𝐀𝐥𝐞𝐞 𝐁𝐨𝐭 𝐏𝐚𝐫𝐚 𝐭𝐮 𝐆𝐫𝐮𝐩𝐨 👑`;

    if (m.isGroup) {
        // URL de la imagen
        const imageUrl ='https://qu.ax/FxpUy.jpg'; // Cambia esta URL por la de la imagen que deseas enviar

        // Envía la imagen con el mensaje
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
    }
}

handler.help = ['precios'];
handler.tags = ['main'];
handler.group = true;
handler.command = ['precios', 'p2'];

export default handler;