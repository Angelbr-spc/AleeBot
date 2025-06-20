import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Obtener nombre del usuario
async function getUserName(conn, jid) {
  let name = await conn.getName(jid);
  if (!name) {
    const contact = await conn.fetchContact(jid);
    name = contact?.notify || contact?.name || jid.split('@')[0];
  }
  return name;
}

// Obtener foto guardada del grupo
function getGroupIcon(m) {
  const dirPath = path.resolve('./groupIcons');
  const groupIconPath = path.join(dirPath, `${m.chat}.jpg`);
  if (fs.existsSync(groupIconPath)) {
    return fs.readFileSync(groupIconPath);
  }
  return null;
}

// Obtener foto de perfil del usuario
async function getUserProfilePicture(conn, jid) {
  try {
    const ppUrl = await conn.profilePictureUrl(jid, 'image');
    if (ppUrl) {
      return await (await fetch(ppUrl)).buffer();
    }
  } catch (e) {}
  return null;
}

// Descargar imagen desde URL
async function fetchImageFromURL(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo descargar la imagen desde el link');
    return await res.buffer();
  } catch {
    return null;
  }
}

export async function before(m, { conn, participants, groupMetadata }) {
  try {
    if (!m.messageStubType || !m.isGroup) return true;

    const userJid = m.messageStubParameters?.[0];
    const taguser = `@${userJid.split('@')[0]}`;
    const chat = global.db?.data?.chats?.[m.chat] || {};
    const defaultWelcomeImage = 'https://qu.ax/FxpUy.jpg';

    let img = await getUserProfilePicture(conn, userJid); // 1. Foto de perfil del usuario

    if (!img) {
      // 2. Imagen personalizada o por defecto
      const fallbackImageUrl =
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD
          ? chat.sWelcomeImage || defaultWelcomeImage
          : chat.sByeImage;

      if (fallbackImageUrl) {
        img = await fetchImageFromURL(fallbackImageUrl);
      }
    }

    if (!img) img = getGroupIcon(m); // 3. Imagen guardada del grupo

    // Mensaje personalizado o por defecto
    let message = '';
    switch (m.messageStubType) {
      case WAMessageStubType.GROUP_PARTICIPANT_ADD:
        message = chat.sWelcome
          ? chat.sWelcome.replace('@user', taguser).replace('@subject', groupMetadata.subject)
          : `_🙂 Hola *${taguser}*, bienvenid@ al grupo *${groupMetadata.subject}*._`;
        break;

      case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
      case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
        message = chat.sBye
          ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
          : `_👋 *${taguser}* salió del grupo._`;
        break;
    }

    if (message) {
      await conn.sendMessage(m.chat, {
        image: img,
        caption: message,
        mentions: [userJid],
      });
    }
  } catch (error) {
    console.error("❌ Error en bienvenida/despedida:", error);
  }
}