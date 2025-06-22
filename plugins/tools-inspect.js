
const handler = async (m, { conn, args}) => {
  if (!args[0]) {
    return m.reply(`📌 Ingresa el enlace de invitación de una comunidad o canal.\n\nEjemplo:\n.ins https://chat.whatsapp.com/xxxxx`);
}

  const url = args[0];
  const code = url.split("/").pop().trim();

  if (!code || code.length < 6) return m.reply("❌ 𝐄𝐧𝐥𝐚𝐜𝐞 𝐢𝐧𝐯á𝐥𝐢𝐝𝐨.");

  try {
    await conn.groupAcceptInvite(code);
    await new Promise(r => setTimeout(r, 3000)); // tiempo para que se actualicen los chats

    const chats = conn.chats;
    const candidatos = Object.entries(chats).filter(([id, data]) =>
      (data?.inviteCode === code) ||
      id.includes("g.us") && (data?.name || "").toLowerCase().includes("newsletter") ||
      id.includes("nestewall") ||
      data?.subject?.toLowerCase().includes("canal") ||
      data?.subject?.toLowerCase().includes("comunidad")
);

    if (!candidatos.length) return m.reply("⚠️ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐢𝐝𝐞𝐧𝐭𝐢𝐟𝐢𝐜𝐚𝐫 𝐞𝐥 𝐈𝐃. 𝐄𝐥 𝐛𝐨𝐭 𝐩𝐮𝐞𝐝𝐞 𝐧𝐨 𝐭𝐞𝐧𝐞𝐫 𝐚𝐜𝐜𝐞𝐬𝐨 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐨 𝐚ú𝐧.");

    const [id, info] = candidatos[0];
    const name = info?.name || info?.subject || "Sin nombre";
    const tipo = id.includes("nestewall")? "📢 Canal (Newsletter)"
: id.startsWith("120363")? "👥 Comunidad"
: "👤 Grupo común";

    return m.reply(`🔎 *Resultado de inspección:*

📛 *Nombre:* ${name}
🆔 *ID:* ${id}
📌 *Tipo:* ${tipo}`);
} catch (e) {
    console.error("❌ Error inspeccionando:", e);
    return m.reply("❌ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐮𝐧𝐢𝐫 𝐨 𝐞𝐱𝐭𝐫𝐚𝐞𝐫 𝐞𝐥 𝐈𝐃. 𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐞𝐧𝐥𝐚𝐜𝐞 𝐞𝐬𝐭é 𝐚𝐜𝐭𝐢𝐯𝐨 𝐲 𝐪𝐮𝐞 𝐞𝐥 𝐛𝐨𝐭 𝐭𝐞𝐧𝐠𝐚 𝐩𝐞𝐫𝐦𝐢𝐬𝐨𝐬.");
}
};

handler.command = ["ins"];
handler.help = ["ins <enlace de invitación>"];
handler.tags = ["tools"];
export default handler;