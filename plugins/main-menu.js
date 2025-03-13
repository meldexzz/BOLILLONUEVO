import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
  before: `
-----------------------

¡𝙃𝙊𝙇𝘼! *%name* ! 𝙎𝙤𝙮 𝘽𝙊𝙏 | 𝙈𝙀𝙎𝙄𝙏𝙊 🦥

𝘿𝙪𝙙𝙖𝙨 𝙤 𝙨𝙪𝙜𝙚𝙧𝙚𝙣𝙘𝙞𝙖𝙨 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙖 𝙖 𝙢𝙞 𝙙𝙪𝙚ñ𝙤.
+52 9981403699

------------------------

*L I S T A  -  M E N Ú S*
`.trimStart(),

  header: '╭──⬣「 *%category* 」⬣',
  body: '│  ➤ *%cmd*\n',
  footer: '╰──⬣\n',
  after: '',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    
    let text = `
${defaultMenu.before}

╭──⬣「 *Info 📚* 」⬣
│  🔱 *.owner* 
│  _Propietario del bot_
│  🔱 *.grupos* 
│  _Muestra los grupos donde el bot está_
│  🔱 *.status* 
│  _Muestra el estado del bot (conexión, ping, etc.)_
│  🔱 *.totalfunciones* 
│  _Muestra el total de funciones del bot_
│  🔱 *.menu* 
│  _Muestra este menú_
│  🔱 *.ping* 
│  _Muestra el tiempo de respuesta del servidor_
│  🔱 *.runtime* 
│  _Muestra el tiempo de actividad del bot_
│  🔱 *.script* 
│  _Muestra el código del bot_
╰──⬣

╭──⬣「 *Busquedas 🔎* 」⬣
│  🔱 *.mercadolibre <búsqueda>* 
│  _Busca productos en MercadoLibre_
│  🔱 *.pinterest* 
│  _Busca imágenes en Pinterest_
│  🔱 *.soundsearch <búsqueda>* 
│  _Busca audios por sonido_
│  🔱 *.spotifysearch <búsqueda>* 
│  _Busca música en Spotify_
│  🔱 *.tiktoksearch *<txt>* 
│  _Busca videos en TikTok_
│  🔱 *.tweetposts *<búsqueda>* 
│  _Busca tweets en Twitter_
│  🔱 *.google <búsqueda>* 
│  _Busca en Google_
│  🔱 *.ytsearch <búsqueda>* 
│  _Busca videos en YouTube_
╰──⬣

╭──⬣「 *Juegos 🎮* 」⬣
│  🔱 *.apostar *<cantidad>* 
│  _Realiza una apuesta (moneda virtual)_
│  🔱 *.slot <apuesta>* 
│  _Juega a las tragamonedas con tu apuesta_
╰──⬣

╭──⬣「 *Sub Bots 🤖* 」⬣
│  🔱 *.bots* 
│  _Muestra los bots que están activos_
│  🔱 *.serbot* 
│  _Activa o desactiva un bot específico_
│  🔱 *.stop* 
│  _Detiene el bot seleccionado_
│  🔱 *.code* 
│  _Muestra el código fuente de un bot_
╰──⬣

╭──⬣「 *RPG 🌠* 」⬣
│  🔱 *.claim* 
│  _Reclama tu recompensa diaria_
│  🔱 *.crimen* 
│  _Participa en un crimen para ganar dinero_
│  🔱 *.dulces* 
│  _Gana dulces virtuales_
│  🔱 *.minar* 
│  _Minar recursos (dinero, objetos)_
│  🔱 *.work* 
│  _Trabaja para ganar dinero_
╰──⬣

╭──⬣「 *Registro 📁* 」⬣
│  🔱 *.sn* 
│  _Muestra tu información de registro_
│  🔱 *.perfil* 
│  _Muestra tu perfil_
│  🔱 *.perfil @user* 
│  _Muestra el perfil de otro usuario_
│  🔱 *.reg *<nombre.edad>* 
│  _Regístrate con tu nombre y edad_
│  🔱 *.unreg* 
│  _Elimina tu registro_
╰──⬣

╭──⬣「 *Stickers 🏞* 」⬣
│  🔱 *.quotly <texto>* 
│  _Genera un sticker con una cita_
│  🔱 *.scat* 
│  _Genera un sticker aleatorio_
│  🔱 *.smeme <texto>* 
│  _Genera un meme como sticker_
│  🔱 *.sticker* 
│  _Convierte una imagen en sticker_
│  🔱 *.wm <nombre>|<autor>* 
│  _Añade marca de agua a un sticker_
│  🔱 *.tovid <sticker>* 
│  _Convierte un sticker en video_
╰──⬣

╭──⬣「 *Imágenes 📸* 」⬣
│  🔱 *.tiktokimg *<url>* 
│  _Descarga imagen de TikTok_
│  🔱 *.imagen <búsqueda>* 
│  _Busca imágenes relacionadas con la búsqueda_
│  🔱 *.megumin* 
│  _Genera una imagen de Megumin_
│  🔱 *.neko* 
│  _Genera una imagen de Neko_
│  🔱 *.pinterest <búsqueda>* 
│  _Busca imágenes en Pinterest_
│  🔱 *.ppcouple* 
│  _Genera una imagen de pareja_
│  🔱 *.shinobu* 
│  _Genera una imagen de Shinobu_
│  🔱 *.waifu* 
│  _Genera una imagen de Waifu_
╰──⬣

╭──⬣「 *Grupos 👥* 」⬣
│  🔱 *.banearbot* 
│  _Banea al bot de un grupo_
│  🔱 *.group open / close* 
│  _Abre o cierra el grupo_
│  🔱 *.grupo abrir / cerrar* 
│  _Abre o cierra el grupo_
│  🔱 *.kick @user* 
│  _Expulsa a un usuario del grupo_
│  🔱 *.link* 
│  _Obtén el link de invitación del grupo_
│  🔱 *.encuesta *<pregunta|opciones>* 
│  _Crea una encuesta en el grupo_
│  🔱 *.promote *593xxx* 
│  _Promociona a un número de teléfono_
│  🔱 *.promote *@usuario* 
│  _Promociona a un usuario_
│  🔱 *.promote *responder chat* 
│  _Promociona el último mensaje del chat_
│  🔱 *.setppgc* 
│  _Establece la foto de perfil del grupo_
│  🔱 *.tag* 
│  _Menciona a todos los miembros del grupo_
│  🔱 *.tagall <mensaje>* 
│  _Menciona a todos los miembros con un mensaje_
│  🔱 *.invocar <mensaje>* 
│  _Invoca a los miembros con un mensaje_
│  🔱 *.desbanearbot* 
│  _Desbanea al bot en el grupo_
│  🔱 *.ds* 
│  _Desactiva los mensajes del bot_
╰──⬣

╭──⬣「 *Logo - maker 🎨* 」⬣
│  🔱 *.sadcat <texto>* 
│  _Genera un logo con texto triste de un gato_
│  🔱 *.tweet <comentario>* 
│  _Genera un logo con un comentario_
╰──⬣

╭──⬣「 *On / Off 📴* 」⬣
│  🔱 *.enable* 
│  _Activa una función o bot_
│  🔱 *.disable* 
│  _Desactiva una función o bot_
╰──⬣

╭──⬣「 *Descargas 📥* 」⬣
│  🔱 *.gdrive <url gdrive>* 
│  _Descarga desde Google Drive_
│  🔱 *.aptoide <búsqueda>* 
│  _Busca aplicaciones en Aptoide_
│  🔱 *.gitclone <url git>* 
│  _Clona un repositorio de GitHub_
│  🔱 *.instagram <url ig>* 
│  _Descarga contenido de Instagram_
│  🔱 *.mediafire <url mf>* 
│  _Descarga desde Mediafire_
│  🔱 *.pindl <pin url>* 
│  _Descarga desde Pindl_
│  🔱 *.soundcloud *<búsqueda>* 
│  _Busca música en SoundCloud_
│  🔱 *.spotify <búsqueda>* 
│  _Busca música en Spotify_
│  🔱 *.spotifydl *<url spotify>* 
│  _Descarga de Spotify_
│  🔱 *.tiktok <url tt>* 
│  _Descarga contenido de TikTok_
│  🔱 *.tiktokimg *<url>* 
│  _Descarga imagen de TikTok_
│  🔱 *.tiktokuser *<usuario>* 
│  _Descarga contenido de un usuario de TikTok_
│  🔱 *.play <formato> <búsqueda>* 
│  _Busca y reproduce música o video_
│  🔱 *.play2 <búsqueda>* 
│  _Reproduce música o video directamente_
│  🔱 *.ytmp3 <yt url>* 
│  _Descarga audio de YouTube_
│  🔱 *.ytmp4 <yt url>* 
│  _Descarga video de YouTube_
╰──⬣

╭──⬣「 *Herramientas 🔧* 」⬣
│  🔱 *.google <búsqueda>* 
│  _Realiza una búsqueda en Google_
│  🔱 *.base64 <enc/dec>* 
│  _Convierte entre texto y base64_
│  🔱 *.fake <texto/@tag/texto>* 
│  _Genera un mensaje falso_
│  🔱 *.hd* 
│  _Convierte imágenes a HD_
│  🔱 *.ibb* 
│  _Convierte imágenes a IBB_
│  🔱 *.igstalk <username>* 
│  _Revisa un perfil de Instagram_
│  🔱 *.morse <encode|decode>* 
│  _Convierte entre texto y código morse_
│  🔱 *.ver* 
│  _Verifica si algo está activo_
│  🔱 *.reenviar* 
│  _Reenvía un mensaje_
│  🔱 *.ss *<url>* 
│  _Toma una captura de pantalla de una web_
│  🔱 *.ssweb *<url>* 
│  _Toma una captura de pantalla web_
│  🔱 *.ai *<petición>* 
│  _Genera una respuesta de inteligencia artificial_
│  🔱 *.togifaud* 
│  _Convierte un GIF en audio_
│  🔱 *.tomp3* 
│  _Convierte un archivo a MP3_
│  🔱 *.tourl* 
│  _Convierte archivos a URL_
│  🔱 *.tovid <sticker>* 
│  _Convierte un sticker en video_
│  🔱 *.tts <texto>* 
│  _Convierte texto a voz_
│  🔱 *.whatmusic <audio/video>* 
│  _Detecta la música de un archivo_
╰──⬣

╭──⬣「 *Diversión 🎲* 」⬣
│  🔱 *.hug <@usuario>* 
│  _Abraza a un usuario_
│  🔱 *.afk <razón>* 
│  _Establece un estado de AFK_
│  🔱 *.dance *<@user>* 
│  _Haz que un usuario baile_
│  🔱 *.gay* 
│  _Haz una broma sobre la sexualidad_
│  🔱 *.horny* 
│  _Haz una broma sobre el deseo_
│  🔱 *.ship* 
│  _Haz que dos usuarios se "enamoren"_
│  🔱 *.simi* 
│  _Interactúa con Simi_
│  🔱 *.bot* 
│  _Inicia una broma del bot_
╰──⬣

╭──⬣「 *Nsfw 🔞* 」⬣
│  🔱 *.rule34 <búsqueda>* 
│  _Busca imágenes NSFW en Rule34_
│  🔱 *.xnxxdl <url>* 
│  _Descarga contenido NSFW de XNXX_
╰──⬣

╭──⬣「 *Creador 😺* 」⬣
│  🔱 *.getdb* 
│  _Obtiene la base de datos del bot_
│  🔱 *.getsesion* 
│  _Obtiene la sesión actual_
│  🔱 *.join <link>* 
│  _Únete a un grupo con un link_
│  🔱 *.reiniciar* 
│  _Reinicia el bot_
│  🔱 *.salir* 
│  _Hace que el bot salga del grupo_
│  🔱 *.savefile <ruta/nombre>* 
│  _Guarda un archivo en la ruta indicada_
│  🔱 *.update* 
│  _Actualiza el bot_
╰──⬣

╭──⬣「 *Audios 🔉* 」⬣
│  🔱 *.bass <mp3/vn>* 
│  _Aplica un efecto bass_
│  🔱 *.blown <mp3/vn>* 
│  _Aplica un efecto blown_
│  🔱 *.deep <mp3/vn>* 
│  _Aplica un efecto deep_
│  🔱 *.earrape <mp3/vn>* 
│  _Aplica un efecto earrape_
│  🔱 *.fast <mp3/vn>* 
│  _Aplica un efecto rápido_
│  🔱 *.fat <mp3/vn>* 
│  _Aplica un efecto fat_
│  🔱 *.nightcore <mp3/vn>* 
│  _Aplica un efecto nightcore_
│  🔱 *.reverse <mp3/vn>* 
│  _Invierte el audio_
│  🔱 *.robot <mp3/vn>* 
│  _Aplica un efecto robot_
│  🔱 *.slow <mp3/vn>* 
│  _Aplica un efecto lento_
│  🔱 *.smooth <mp3/vn>* 
│  _Aplica un efecto suave_
│  🔱 *.tupai <mp3/vn>* 
│  _Aplica un efecto tupai_
│  🔱 *.reverb <mp3/vn>* 
│  _Aplica un efecto reverb_
│  🔱 *.chorus <mp3/vn>* 
│  _Aplica un efecto chorus_
│  🔱 *.flanger <mp3/vn>* 
│  _Aplica un efecto flanger_
│  🔱 *.distortion <mp3/vn>* 
│  _Aplica un efecto de distorsión_
│  🔱 *.pitch <mp3/vn>* 
│  _Aplica un efecto pitch_
│  🔱 *.highpass <mp3/vn>* 
│  _Aplica un filtro de alta frecuencia_
│  🔱 *.lowpass <mp3/vn>* 
│  _Aplica un filtro de baja frecuencia_
│  🔱 *.underwater <mp3/vn>* 
│  _Aplica un efecto de sonido bajo el agua_
╰──⬣

╭──⬣「 *Otro 🌀* 」⬣
│  🔱 *.eval <expresión matemática>* 
│  _Evalúa una expresión matemática_
│  🔱 *.fakeid <nombre>* 
│  _Genera una identidad falsa_
│  🔱 *.googledoodle* 
│  _Genera el doodle de Google_
╰──⬣

`.trimStart()
    
    let replace = {
      '%': '%',
      p: _p, uptime,
      name, exp, limit
    }
    
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join('|')})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = './storage/img/miniurl.jpg'
    await conn.sendFile(m.chat, pp, 'thumbnail.jpg', text.trim(), m)
    
  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.command = ['menu', 'help', 'menú']
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
