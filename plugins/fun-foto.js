
import fetch from 'node-fetch'; 
import MessageType from '@whiskeysockets/baileys'; 

const handler = async (m, { conn }) => { 
  try {
    // Reemplaza con el enlace de tu imagen antigua
    const imageUrl = 'https://i.ibb.co/bj6sKRxF/file.jpg'; 

    // Enviar la imagen
    await conn.sendFile(m.chat, imageUrl, 'fotoantigua.jpg', 'Aquí tienes tu foto antigua!', m);
  } catch (e) {
    console.error(e);
    conn.sendMessage(m.chat, { text: '𝐋𝐨 𝐬𝐢𝐞𝐧𝐭𝐨, 𝐨𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐧𝐯𝐢𝐚𝐫 𝐥𝐚 𝐟𝐨𝐭𝐨.' }, { quoted: m });
  }
}; 

handler.command = /^\.fotoantiguabot$/i; 
export default handler;