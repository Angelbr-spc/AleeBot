let handler = async (m, { conn }) => {
    let users = global.db.data.users;
    users[m.sender].limit = Infinity; 

    await m.reply('¡𝐀𝐡𝐨𝐫𝐚 𝐭𝐢𝐞𝐧𝐞𝐬 *𝐊𝐈 𝐢𝐧𝐟𝐢𝐧𝐢𝐭𝐨*! 🎉');
};

handler.help = ['chetarki'];
handler.tags = ['rpg'];
handler.command = ['chetarki'];
handler.register = true;
handler.owner = true
export default handler;