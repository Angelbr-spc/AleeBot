

let handler = async (m, { args, text, command, conn }) => {
    if (!args[0]) {
        return m.reply(`💨 ¡Hola! Para reaccionar a un mensaje, usa el siguiente formato:\n${command} https://whatsapp.com/channel/... ¡Hola, amigos! 🎉`);
    }

    if (!args[0].startsWith("https://whatsapp.com/channel/")) {
        return m.reply("❌ 𝐔𝐩𝐬! 𝐍𝐨 𝐞𝐬 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞 𝐯á𝐥𝐢𝐝𝐨. 𝐀𝐬𝐞𝐠ú𝐫𝐚𝐭𝐞 𝐝𝐞 𝐪𝐮𝐞 𝐞𝐦𝐩𝐢𝐞𝐳𝐚 𝐜𝐨𝐧 𝐡𝐭𝐭𝐩𝐬://𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩.𝐜𝐨𝐦/𝐜𝐡𝐚𝐧𝐧𝐞𝐥/.");
    }

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const emojiInput = args.slice(1).join(' ').toLowerCase();
    const emoji = emojiInput.split('').map(c => {
        return c === '' ? "•" : (hurufGaya[c] || c);
    }).join('');

    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];

        const res = await conn.newsletterMetadata("invite", channelId);
        await conn.newsletterReactMessage(res.id, messageId, emoji);

        return m.reply(`🎉 ¡Felicidades! Se envió la reacción *${emoji}* al mensaje en el canal *${res.name}*. ¡Que comience la fiesta! 🥳`);
    } catch (e) {
        console.error(e);
        return m.reply("🚫 𝐎𝐡 𝐧𝐨... 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐫 𝐥𝐚 𝐫𝐞𝐚𝐜𝐜𝐢ó𝐧. 𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐞𝐧𝐥𝐚𝐜𝐞 𝐲 𝐞𝐥 𝐭𝐞𝐱𝐭𝐨 𝐬𝐞𝐚𝐧 𝐯á𝐥𝐢𝐝𝐨𝐬. ¡𝐕𝐚𝐦𝐨𝐬 𝐚 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫𝐥𝐨 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨! 🤞");
    }
};

handler.help = handler.command = ["rc"];
handler.tags = ["tools"];
export default handler;