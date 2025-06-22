
const carteras = {}; // { userId: { monedas: 0, dulces: 0, xp: 0 } }

const handler = async (m) => {
    if (m.text.startsWith('.xp')) {
        const usuarioId = m.sender; // Obtener el identificador del usuario

        // Verificar si el usuario tiene una cartera
        if (!carteras[usuarioId]) {
            return m.reply("❌ 𝐍𝐨 𝐭𝐢𝐞𝐧𝐞𝐬 𝐮𝐧𝐚 𝐜𝐚𝐫𝐭𝐞𝐫𝐚 𝐜𝐫𝐞𝐚𝐝𝐚. ¡𝐏𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚 𝐞𝐧 𝐚𝐜𝐭𝐢𝐯𝐢𝐝𝐚𝐝𝐞𝐬 𝐩𝐚𝐫𝐚 𝐞𝐦𝐩𝐞𝐳𝐚𝐫 𝐚 𝐠𝐚𝐧𝐚𝐫 𝐞𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐢𝐚!");
        }

        const xpActual = carteras[usuarioId].xp; // Obtener la experiencia actual

        // Mensaje a enviar
        const mensaje = `📊 *Experiencia Actual*\n\n✨ Tienes ${xpActual} XP. ¡Sigue participando para ganar más!`;

        return m.reply(mensaje);
    }
};

handler.command = /^(xp)$/i;
export default handler;