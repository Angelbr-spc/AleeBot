
import fs from 'fs';

const archivoRegistro = './chats_ya_notificados.json';
let yaNotificados = new Set(
  fs.existsSync(archivoRegistro)
? JSON.parse(fs.readFileSync(archivoRegistro))
: []
);

const enviarAvisoCanal = async (conn, notifyChat = null) => {
  const mensaje = `⭐ *¡Te invitamos a nuestro canal!* 🌟\n\nEste es el canal oficial 📢 de *𝐀𝐥𝐞𝐞𝐁𝐨𝐭 👑*:\n\n👉 https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18\n\nSíguelo para estar al tanto de *comandos, novedades y actualizaciones*. ¡Gracias por tu apoyo! 🙌`;

  const chats = Object.entries(conn.chats).filter(([jid, chat]) => jid && chat.isChats);
  let usuarios = [];
  let grupos = [];

  if (notifyChat) await conn.sendMessage(notifyChat, { text: '📢 *Enviando mensaje del canal...* Esto puede tardar unos segundos.'});

  for (let [jid] of chats) {
    if (yaNotificados.has(jid)) continue;

    const isGroup = jid.endsWith('@g.us');
    try {
      await conn.sendMessage(jid, { text: mensaje});
      if (isGroup) grupos.push(jid);
      else usuarios.push(jid);
      yaNotificados.add(jid);
} catch (e) {
      console.log(`❌ Error al enviar a ${jid}`);
}
    await new Promise(resolve => setTimeout(resolve, 400));
}

  fs.writeFileSync(archivoRegistro, JSON.stringify([...yaNotificados], null, 2));

  let resumen = `✅ *Mensaje del canal enviado correctamente*\n\n📨 Total: ${usuarios.length + grupos.length} nuevos chats\n👤 Usuarios: ${usuarios.length}\n👥 Grupos: ${grupos.length}\n\n`;

  if (usuarios.length) {
    resumen += `📋 *Usuarios:*\n` + usuarios.map(u => `• wa.me/${u.replace(/[^0-9]/g, '')}`).join('\n') + '\n\n';
}

  if (grupos.length) {
    resumen += `📋 *Grupos:*\n`;
    for (const g of grupos) {
      try {
        let metadata = await conn.groupMetadata(g);
        resumen += `• ${metadata.subject}\n`;
} catch {
        resumen += `• ${g}\n`;
}
}
}

  if (notifyChat) await conn.sendMessage(notifyChat, { text: resumen});

  return { usuarios, grupos};
};

const handler = async (m, { conn, isOwner}) => {
  if (!isOwner) throw '❌ Este comando es solo para el *owner*.';
  await enviarAvisoCanal(conn, m.chat);
};

handler.help = ['canal'];
handler.tags = ['owner'];
handler.command = ['canal'];
handler.owner = true;

// También se puede activar al arrancar el bot
handler.run = async (conn) => {
  await enviarAvisoCanal(conn, null);
};

export default handler;