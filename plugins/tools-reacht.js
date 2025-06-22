
const handler = async (m, { conn }) => {
    if (!args[0]) return m.reply(`ejemplo:\n.channelReact https://whatsapp.com/channel/xxxx hola`);

if (!args[0].startsWith("https://whatsapp.com/channel/")) return m.reply("𝐋𝐢𝐧𝐤 𝐧𝐨 𝐞𝐬 𝐯á𝐥𝐢𝐝𝐨.");

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
        if (c === ' ') return '―';
        return hurufGaya[c] || c;
    }).join('');

    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];

        const res = await conn.newsletterMetadata("invite", channelId);
        await conn.newsletterReactMessage(res.id, messageId, emoji);

        return m.reply(`Se envió correctamente la reacción *${emoji}* al mensaje en el canal *${res.name}*.`);
    } catch (e) {
        console.error(e);
        return m.reply("𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐧𝐯𝐢𝐚𝐫 𝐫𝐞𝐚𝐜𝐜𝐢ó𝐧. 𝐀𝐬𝐞𝐠ú𝐫𝐚𝐭𝐞 𝐝𝐞 𝐪𝐮𝐞 𝐞𝐥 𝐞𝐧𝐥𝐚𝐜𝐞 𝐲 𝐞𝐥 𝐞𝐦𝐨𝐣𝐢 𝐬𝐞𝐚𝐧 𝐯á𝐥𝐢𝐝𝐨𝐬.");
    }
}
handler.command = /^(ch)$/i
export default handler