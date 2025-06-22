
import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply("🔍 *𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐠𝐫𝐞𝐬𝐚 𝐭𝐮 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐩𝐚𝐫𝐚 𝐥𝐚 𝐈𝐀.*");

    try {
        m.react("💬");
        let respuesta = await (await fetch(`https://api.sylphy.xyz/ai/chatgpt?text=${encodeURIComponent(text)}`)).json();

        if (!respuesta || !respuesta.data) return m.reply("⚠️ *𝐍𝐨 𝐬𝐞 𝐨𝐛𝐭𝐮𝐯𝐨 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞.*");

        await m.reply(`🤖 *Respuesta AI:* \n${respuesta.data}`);
    } catch (e) {
        m.reply("❌ *𝐎𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐩𝐫𝐨𝐜𝐞𝐬𝐚𝐫 𝐥𝐚 𝐫𝐞𝐬𝐩𝐮𝐞𝐬𝐭𝐚. 𝐈𝐧𝐭é𝐧𝐭𝐚𝐥𝐨 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞.*");
    }
};

handler.help = ["chatbot"];
handler.tags = ["ai"];
handler.command = ["chatbot", "askai"];

export default handler;