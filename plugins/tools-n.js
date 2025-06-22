
const subbotConfig = {};

const handler = async (m, { conn, args, command}) => {
    const subbotId = m.sender;

    if (!subbotConfig[subbotId]) {
        subbotConfig[subbotId] = {
            name: 'Subbot',
            color: 'blue',
            style: 'normal',
            description: 'Soy un subbot listo para ayudarte.'
};
}

    if (command === 'newname') {
        if (!args[0]) return m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:* 𝐃𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐞𝐥 𝐧𝐮𝐞𝐯𝐨 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐬𝐩𝐮é𝐬 𝐝𝐞 `.𝐧𝐞𝐰𝐧𝐚𝐦𝐞`.');
        subbotConfig[subbotId].name = args.join(' ');
        return m.reply(`✅ *¡Nombre cambiado con éxito!* 📌 Nuevo nombre: *${subbotConfig[subbotId].name}*`);
}

    if (command === 'setcolor') {
        if (!args[0]) return m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:* 𝐄𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚 𝐮𝐧 𝐜𝐨𝐥𝐨𝐫 𝐝𝐞𝐬𝐩𝐮é𝐬 𝐝𝐞 `.𝐬𝐞𝐭𝐜𝐨𝐥𝐨𝐫`.');
        subbotConfig[subbotId].color = args[0].toLowerCase();
        return m.reply(`✅ *¡Color del texto actualizado!* 🎨 Nuevo color: *${subbotConfig[subbotId].color}*`);
}

    if (command === 'setstyle') {
        if (!args[0]) return m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:* 𝐄𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚 𝐮𝐧 𝐞𝐬𝐭𝐢𝐥𝐨 𝐝𝐞𝐬𝐩𝐮é𝐬 𝐝𝐞 `.𝐬𝐞𝐭𝐬𝐭𝐲𝐥𝐞`.');
        subbotConfig[subbotId].style = args[0].toLowerCase();
        return m.reply(`✅ *¡Estilo del texto actualizado!* ✍️ Nuevo estilo: *${subbotConfig[subbotId].style}*`);
}

    if (command === 'setdescription') {
        if (!args[0]) return m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:* 𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢ó𝐧 𝐝𝐞𝐬𝐩𝐮é𝐬 𝐝𝐞 `.𝐬𝐞𝐭𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧`.');
        subbotConfig[subbotId].description = args.join(' ');
        return m.reply(`✅ *¡Descripción personalizada guardada!* 📜 Nueva descripción: *${subbotConfig[subbotId].description}*`);
}

    if (command === 'profileinfo') {
        return m.reply(`📌 *Perfil de tu subbot:*\n📢 *Nombre:* ${subbotConfig[subbotId].name}\n🎨 *Color:* ${subbotConfig[subbotId].color}\n✍️ *Estilo:* ${subbotConfig[subbotId].style}\n📜 *Descripción:* ${subbotConfig[subbotId].description}`);
}
};

handler.command = /^(|setcolor|setstyle|setdescription|profileinfo)$/i;
export default handler;