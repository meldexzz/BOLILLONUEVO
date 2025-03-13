import { thumbnail } from '../exports.js';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    
    // Obtenemos la miniatura del bot (thumbnail)
    let thumb = await (await fetch(thumbnail)).buffer();
    
    // Obtenemos el nombre del usuario que ejecutó el comando
    let name = await conn.getName(m.sender);
    
    // Aquí definimos el menú
    let menu = `
Hola *${name}*, ¿en qué puedo ayudarte hoy? 😀

【 𝘔𝘌𝘕𝘜 𝘋𝘌 𝘊𝘖𝘔𝘈𝘕𝘋𝘖𝘚 】
${readMore}

╭─❮ *─ INFORMACIÓN ─* ❯
├ ▢ *.owner*
├ ⓘ _Propietario del bot_
├ ▢ *.ping*
├ ⓘ _Tiempo de respuesta del servidor_
├ ▢ *.runtime*
├ ⓘ _Tiempo encendido_
├ ▢ *.info*
├ ⓘ _Información sobre el bot_
╰─❮ ❯

╭─❮ *─ BUSCADORES ─* ❯
├ ▢ *.ytsearch* | *.yts*
├ ⓘ _Buscar videos en YouTube_
├ ▢ *.spotifys*
├ ⓘ _Buscar música en Spotify_
├ ▢ *.pinterest*
├ ⓘ _Buscar imágenes en Pinterest_
├ ▢ *.googleimg* | *.goimg*
├ ⓘ _Buscar imágenes en Google_
├ ▢ *.tiktoksearch* | *.tts*
├ ⓘ _Buscar videos en TikTok_
╰─❮ ❯

╭─❮ *─ DESCARGAS ─* ❯
├ ▢ *.ytmp4* | *.ytv* | *.ytmp4doc*
├ ⓘ _Descargar videos de YouTube_
├ ▢ *.ytmp3* | *.yta* | *.ytmp3doc*
├ ⓘ _Descargar audios de YouTube_
├ ▢ *.spotifydl*
├ ⓘ _Descargar música de Spotify_
├ ▢ *.tiktok* | *.ttdl*
├ ⓘ _Descargar videos de TikTok_
├ ▢ *.facebook* | *.fb*
├ ⓘ _Descargar videos de Facebook_
├ ▢ *.instagram* | *.ig*
├ ⓘ _Descargar videos/fotos de Instagram_
├ ▢ *.gitclone*
├ ⓘ _Descargar repositorios de GitHub_
├ ▢ *.mediafire*
├ ⓘ _Descargar archivos de Mediafire_
╰─❮ ❯

╭─❮ *─ HERRAMIENTAS ─* ❯
├ ▢ *.base64*
├ ⓘ _Encriptar/Desencriptar textos en base64_
├ ▢ *.hd*
├ ⓘ _Mejorar la calidad de imágenes a HD_
├ ▢ *.morse*
├ ⓘ _Encriptar/Desencriptar textos en código morse_
├ ▢ *.toaudio*
├ ⓘ _Convertidor de video a audio_
├ ▢ *.upload*
├ ⓘ _Subir imágenes y obtener enlace_
├ ▢ *.tts*
├ ⓘ _Convertidor de texto a voz_
╰─❮ ❯

╭─❮ *─ PROPIETARIO ─* ❯
├ ▢ *.enable*
├ ⓘ _Activar función_
├ ▢ *.disable*
├ ⓘ _Desactivar función_
╰─❮ ❯
    `.trim();
    
    // Enviamos el mensaje con el menú
    await conn.sendAiri(m.chat, botname, botdesc, menu, true, thumb, null, m);
};

handler.command = ['menu', 'menú', 'help', 'comandos'];
export default handler;

// Para el 'readMore' (más contenido al final del mensaje)
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
