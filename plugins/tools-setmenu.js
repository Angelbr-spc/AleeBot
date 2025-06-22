
import { downloadContentFromMessage} from '@whiskeysockets/baileys';
import fs from 'fs';

const handler = async (m, { conn}) => {
    try {
        // Verificar si el mensaje citado es una imagen
        if (!m.quoted ||!m.quoted.mimetype ||!m.quoted.mimetype.startsWith('image/')) {
            return m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:* 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 `.𝐬𝐞𝐭𝐦𝐞𝐧𝐮` 𝐩𝐚𝐫𝐚 𝐜𝐚𝐦𝐛𝐢𝐚𝐫 𝐥𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐝𝐞𝐥 𝐦𝐞𝐧ú.');
}

        // Descargar la imagen adjunta
        const media = await downloadContentFromMessage(m.quoted, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
}

        // Guardar la imagen en una ubicación accesible
        const path = './menu.jpg';
        fs.writeFileSync(path, buffer);

        // Confirmar el cambio con emojis
        m.reply('✅ *¡𝐈𝐦𝐚𝐠𝐞𝐧 𝐝𝐞𝐥 𝐦𝐞𝐧ú 𝐜𝐚𝐦𝐛𝐢𝐚𝐝𝐚 𝐜𝐨𝐧 é𝐱𝐢𝐭𝐨!* 😃📸');

        // Enviar la nueva imagen del menú para confirmar el cambio
        await conn.sendMessage(m.chat, { image: { url: path}, caption: '📌 *Nueva imagen del menú aplicada.*'});

} catch (error) {
        console.error(error);
        m.reply('⚠️ *Error:* No se pudo cambiar la imagen del menú. 🛑\n' + error.message);
}
};

handler.command = /^setmenu$/i;
export default handler;