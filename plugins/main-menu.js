import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
  before: `
*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

¡Hola *%name*! ¿Cómo estás el día de hoy? 😊

╭──⬣「 *Información del Usuario* 」⬣
│  ≡◦ *🍭 Nombre:* %name
│  ≡◦ *🍬 Dulces:* %limit
│  ≡◦ *💫 XP:* %totalexp
│  ≡◦ *🐢 Nivel:* %level
╰──⬣
%readmore

*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

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
╭─❮ *─ INFORMACIÓN ─* ❯
├ 🔱 *.owner* 
├ _Propietario del bot_
├ 🔱 *.ping* 
├ _Tiempo de respuesta del servidor_
├ 🔱 *.runtime* 
├ _Tiempo encendido_
├ 🔱 *.info* 
├ _Información sobre el bot_
╰─❮ ❯

╭─❮ *─ BUSCADORES ─* ❯
├ 🔱 *.ytsearch* | *.yts* 
├ _Buscar videos en YouTube_
├ 🔱 *.spotifys* 
├ _Buscar música en Spotify_
├ 🔱 *.pinterest* 
├ _Buscar imágenes en Pinterest_
╰─❮ ❯

╭─❮ *─ DESCARGAS ─* ❯
├ 🔱 *.ytmp4* | *.ytv* 
├ _Descargar videos de YouTube_
├ 🔱 *.ytmp3* 
├ _Descargar audios de YouTube_
├ 🔱 *.spotifydl* 
├ _Descargar música de Spotify_
╰─❮ ❯

╭─❮ *─ HERRAMIENTAS ─* ❯
├ 🔱 *.base64* 
├ _Convertir texto en Base64_
├ 🔱 *.hd* 
├ _Mejorar la calidad de imágenes_
├ 🔱 *.morse* 
├ _Convertir texto a código morse_
╰─❮ ❯

%readmore
*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*
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
