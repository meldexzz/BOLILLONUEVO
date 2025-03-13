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
├ _𝘗𝘳𝘰𝘱𝘪𝘦𝘵𝘢𝘳𝘪𝘰 𝘥𝘦𝘭 𝘣𝘰𝘵_
├ 🔱 *.ping* 
├ _𝘛𝘪𝘦𝘮𝘱𝘰 𝘥𝘦 𝘳𝘦𝘴𝘱𝘶𝘦𝘴𝘵𝘢 𝘥𝘦𝘭 𝘴𝘦𝘳𝘷𝘪𝘥𝘰𝘳_
├ 🔱 *.runtime* 
├ _𝘛𝘪𝘦𝘮𝘱𝘰 𝘦𝘯𝘤𝘦𝘯𝘥𝘪𝘥𝘰_
├ 🔱 *.info* 
├ _𝘪𝘯𝘧𝘰𝘳𝘮𝘢𝘤𝘪𝘰𝘯 𝘴𝘰𝘣𝘳𝘦 𝘦𝘭 𝘣𝘰𝘵_
╰─❮ ❯

╭─❮ *─ BUSCADORES ─* ❯
├ 🔱 *.ytsearch* | *.yts* 
├ _𝘽𝘶𝘴𝘤𝘢𝘳 𝘷𝘪𝘥𝘦𝘰𝘴 𝘦𝘯 𝘠𝘰𝘶𝘛𝘶𝘣𝘦_
├ 🔱 *.spotifys* 
├ _𝘽𝘶𝘴𝘤𝘢𝘳 𝘮𝘶𝘴𝘪𝘤𝘢 𝘦𝘯 𝘚𝘱𝘰𝘵𝘪𝘧𝘺_
├ 🔱 *.pinterest* 
├ _𝘽𝘶𝘴𝘤𝘢𝘳 𝘪𝘮𝘢𝘨𝘪𝘯𝘦𝘴 𝘦𝘯 𝘗𝘪𝘯𝘵𝘦𝘳𝘦𝘴𝘵_
╰─❮ ❯

╭─❮ *─ DESCARGAS ─* ❯
├ 🔱 *.ytmp4* | *.ytv* 
├ _𝘿𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘷𝘪𝘥𝘦𝘰𝘴 𝘥𝘦 𝘠𝘰𝘶𝘛𝘶𝘣𝘦_
├ 🔱 *.ytmp3* 
├ _𝘿𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘢𝘶𝘥𝘪𝘰𝘴 𝘥𝘦 𝘠𝘰𝘶𝘛𝘶𝘣𝘦_
├ 🔱 *.spotifydl* 
├ _𝘿𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘮𝘶𝘴𝘪𝘤𝘢 𝘥𝘦 𝘚𝘱𝘰𝘵𝘪𝘧𝘺_
╰─❮ ❯

╭─❮ *─ HERRAMIENTAS ─* ❯
├ 🔱 *.base64* 
├ _𝘾𝘰𝘯𝘷𝘦𝘳𝘵𝘪𝘳 𝘵𝘦𝘺𝘵𝘰 𝘦𝘯 𝘉𝘢𝘴𝘦64_
├ 🔱 *.hd* 
├ _𝘔𝘦𝘫𝘰𝘳𝘢𝘳 𝘭𝘢 𝘤𝘶𝘢𝘭𝘪𝘥𝘢𝘥 𝘥𝘦 𝘪𝘮𝘢𝘨𝘪𝘯𝘦𝘴_
├ 🔱 *.morse* 
├ _𝘾𝘰𝘯𝘷𝘦𝘳𝘵𝘪𝘳 𝘵𝘦𝘺𝘵𝘰 𝘢 𝘤𝘰𝘥𝘪𝘨𝘰 𝘮𝘰𝘳𝘴𝘦_
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
