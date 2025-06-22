let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {};
    if (!text) throw m.reply(`*⚡ Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*⚡ Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);

    let split = text.trim().split(/ (.+)/); 
    let jid = split[0]; 
    let pesan = split[1]; 

    if (!jid || !pesan) throw m.reply(`*⚡ Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*⚡ Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);

    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
    let data = (await conn.onWhatsApp(jid))[0] || {}; 
    if (!data.exists) throw m.reply('⚡ 𝐄𝐥 𝐧ú𝐦𝐞𝐫𝐨 𝐧𝐨 𝐞𝐬𝐭á 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩.');
    if (jid == m.sender) throw m.reply('⚡ 𝐍𝐨 𝐩𝐮𝐞𝐝𝐞𝐬 𝐦𝐚𝐧𝐝𝐚𝐫𝐭𝐞 𝐮𝐧 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐚 𝐭𝐢 𝐦𝐢𝐬𝐦𝐨.');

    let mf = Object.values(conn.menfess).find(mf => mf.status === true);
    if (mf) return !0;

    let id = Math.floor(1000 + Math.random() * 9000); 
    let teks = `*Hola* @${data.jid.split("@")[0]}, *recibiste un mensaje de confesión.*\n*Para* responder\n*Ejemplo: .respuesta <id> <Mensaje>*\n\n*\`ID:\`* *${id}*\n*\`MENSAJE:\`* \n\n${pesan}`.trim();

    try {

        let sentMessage = await conn.sendMessage(data.jid, {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S I O N E S',
                    body: '¡responder! .respuesta (id) (Mensaje)',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'
                }
            }
        });


        if (sentMessage) {
            conn.menfess[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan: pesan,
                status: false 
            };
            return conn.reply(m.chat, '*⚡ Respuesta enviada con éxito.*\n*IDENTIFICADOR:*' + ` *${id}*`, m, fake);
        }

    } catch (e) {
        console.error(e);
        m.reply('⚠️ 𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐧𝐯𝐢𝐚𝐫 𝐥𝐚 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚.');
    }
}

handler.tags = ['rg'];
handler.help = ['confesar'].map(v => v + ' <número mensaje>');
handler.command = ['confesar', 'confesiones']
handler.register = true;
handler.private = true;

export default handler;