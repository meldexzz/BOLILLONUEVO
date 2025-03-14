import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

const defaultMenu = {
  before: `
╔═══════════════╗

¡𝙃𝙊𝙇𝘼! *%name* ! 𝙎𝙤𝙮 𝘽𝙊𝙏 | 𝙈𝙀𝙎𝙄𝙏𝙊 🦥

📍 𝘔𝘌𝘚𝘐𝘛𝘖 𝘚𝘛𝘖𝘙𝘌, 𝘝𝘌𝘕𝘛𝘈 𝘋𝘌 𝘗𝘓𝘈𝘛𝘈𝘍𝘖𝘙𝘔𝘈𝘚, 𝘉𝘖𝘛𝘚 𝘠 𝘔𝘈𝘚 𝘈𝘓 +52 9981403699 📍

╚═══════════════╝

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

▸▸ 𝙄𝙉𝙁𝙊 🌟◂◂
│┊➺ 💻 *.owner*
│┊➺ 🌍 *.grupos*
│┊➺ ⚡ *.status*
│┊➺ 📊 *.totalfunciones*
│┊➺ 📋 *.menu*
│┊➺ ⏱ *.ping*
│┊➺ 💬 *.runtime*
│┊➺ 🖥 *.script*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙃𝙐𝙏𝙏𝙀𝙍𝙎 🔎◂◂
│┊➺ 🛍 *.mercadolibre <búsqueda>*
│┊➺ 📌 *.pinterest*
│┊➺ 🎶 *.soundsearch <búsqueda>*
│┊➺ 🎧 *.spotifysearch <búsqueda>*
│┊➺ 🎥 *.tiktoksearch <búsqueda>*
│┊➺ 🐦 *.tweetposts <búsqueda>*
│┊➺ 🌐 *.google <búsqueda>*
│┊➺ 📺 *.ytsearch <búsqueda>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙅𝙐𝙀𝙂𝙊𝙎 🎮◂◂
│┊➺ 💰 *.apostar <cantidad>*
│┊➺ 🎰 *.slot <apuesta>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙍𝙋𝙂 🌠◂◂
│┊➺ 🎁 *.claim*
│┊➺ 🕵️‍♂️ *.crimen*
│┊➺ 🍬 *.dulces*
│┊➺ ⛏ *.minar*
│┊➺ 💼 *.work*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊 📑◂◂
│┊➺ 🧑‍💻 *.sn*
│┊➺ 👤 *.perfil*
│┊➺ 👥 *.perfil @user*
│┊➺ 🖊 *.reg <nombre.edad>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙎𝙏𝙄𝘾𝙆𝙀𝙍𝙎 🏞◂◂
│┊➺ ✨ *.quotly <texto>*
│┊➺ 🎲 *.scat*
│┊➺ 😂 *.smeme <texto>*
│┊➺ 📸 *.sticker*
│┊➺ 💧 *.wm <nombre>|<autor>*
│┊➺ 🎥 *.tovid <sticker>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙄𝙈𝘼𝙂𝙀𝙉𝙀𝙎 📸◂◂
│┊➺ 🌟 *.tiktokimg <url>*
│┊➺ 🔍 *.imagen <búsqueda>*
│┊➺ 💥 *.megumin*
│┊➺ 🐾 *.neko*
│┊➺ 💑 *.ppcouple*
│┊➺ 🥢 *.shinobu*
│┊➺ 💖 *.waifu*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙂𝙍𝙐𝙋𝙊𝙎 👥◂◂
│┊➺ 🚫 *.banearbot*
│┊➺ 🔓 *.group open / close*
│┊➺ 🔐 *.grupo abrir / cerrar*
│┊➺ ❌ *.kick @user*
│┊➺ 🔗 *.link*
│┊➺ 🗳 *.encuesta <pregunta|opciones>*
│┊➺ 📞 *.promote 593xxx*
│┊➺ 📲 *.promote @usuario*
│┊➺ 🔄 *.promote responder chat*
│┊➺ 📷 *.setppgc*
│┊➺ 🏷 *.tag*
│┊➺ 📣 *.tagall <mensaje>*
│┊➺ 💬 *.invocar <mensaje>*
│┊➺ 🚫 *.desbanearbot*
│┊➺ 🔕 *.ds*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙇𝙊𝙂𝙊 - 𝙈𝘼𝙆𝙀𝙍 🎨◂◂
│┊➺ 😿 *.sadcat <texto>*
│┊➺ 💬 *.tweet <comentario>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙊𝙉 / 𝙊𝙁𝙁 📴◂◂
│┊➺ ✅ *.enable*
│┊➺ ❌ *.disable*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝘿𝙀𝙎𝘾𝘼𝙂𝘼𝙎 📥◂◂
│┊➺ 🌐 *.gdrive <url gdrive>*
│┊➺ 📱 *.aptoide <búsqueda>*
│┊➺ 🖥 *.gitclone <url git>*
│┊➺ 📸 *.instagram <url ig>*
│┊➺ 🖱 *.mediafire <url mf>*
│┊➺ 🔑 *.pindl <pin url>*
│┊➺ 🎶 *.soundcloud <búsqueda>*
│┊➺ 🎵 *.spotify <búsqueda>*
│┊➺ 📥 *.spotifydl <url spotify>*
│┊➺ 🎬 *.tiktok <url tt>*
│┊➺ 🖼 *.tiktokimg <url>*
│┊➺ 👤 *.tiktokuser <usuario>*
│┊➺ 🎵 *.play <formato> <búsqueda>*
│┊➺ 🎥 *.play2 <búsqueda>*
│┊➺ 🎧 *.ytmp3 <yt url>*
│┊➺ 🎬 *.ytmp4 <yt url>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙃𝙀𝙍𝙍𝙁𝙐𝙇𝙇𝙏 🔧◂◂
│┊➺ 🔍 *.google <búsqueda>*
│┊➺ 🔑 *.base64 <enc/dec>*
│┊➺ ✍ *.fake <texto/@tag/texto>*
│┊➺ 🖼 *.hd*
│┊➺ 🖼 *.ibb*
│┊➺ 📷 *.igstalk <username>*
│┊➺ 📡 *.morse <encode|decode>*
│┊➺ ✅ *.ver*
│┊➺ 🔁 *.reenviar*
│┊➺ 📸 *.ss <url>*
│┊➺ 🌐 *.ssweb <url>*
│┊➺ 🤖 *.ai <petición>*
│┊➺ 🎵 *.togifaud*
│┊➺ 🎶 *.tomp3*
│┊➺ 🔗 *.tourl*
│┊➺ 🎥 *.tovid <sticker>*
│┊➺ 🗣 *.tts <texto>*
│┊➺ 🎵 *.whatmusic <audio/video>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝘿𝙄𝙑𝙀𝙍𝙎𝙄𝙊𝙉 🎲◂◂
│┊➺ 🤗 *.hug <@usuario>*
│┊➺ 🏖 *.afk <razón>*
│┊➺ 💃 *.dance <@user>*
│┊➺ 🌈 *.gay*
│┊➺ 😜 *.horny*
│┊➺ 💘 *.ship*
│┊➺ 🤖 *.simi*
│┊➺ 🤣 *.bot*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙉𝙎𝙁𝙒 🔞◂◂
│┊➺ 🌐 *.rule34 <búsqueda>*
│┊➺ 🔞 *.xnxxdl <url>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 😺◂◂
│┊➺ 🗂 *.getdb*
│┊➺ 💾 *.getsesion*
│┊➺ 🔗 *.join <link>*
│┊➺ 🔄 *.reiniciar*
│┊➺ 🚪 *.salir*
│┊➺ 💾 *.savefile <ruta/nombre>*
│┊➺ 📥 *.update*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝘼𝙐𝘿𝙄𝙊𝙎 🔉◂◂
│┊➺ 🔊 *.bass <mp3/vn>*
│┊➺ 🌬 *.blown <mp3/vn>*
│┊➺ 🌑 *.deep <mp3/vn>*
│┊➺ 🎧 *.earrape <mp3/vn>*
│┊➺ ⏩ *.fast <mp3/vn>*
│┊➺ 💨 *.fat <mp3/vn>*
│┊➺ 🌙 *.nightcore <mp3/vn>*
│┊➺ 🔁 *.reverse <mp3/vn>*
│┊➺ 🤖 *.robot <mp3/vn>*
│┊➺ 🐢 *.slow <mp3/vn>*
│┊➺ 🌫 *.smooth <mp3/vn>*
│┊➺ 🐒 *.tupai <mp3/vn>*
│┊➺ 🔊 *.reverb <mp3/vn>*
│┊➺ 🎤 *.chorus <mp3/vn>*
│┊➺ 🔄 *.flanger <mp3/vn>*
│┊➺ 🔊 *.distortion <mp3/vn>*
│┊➺ 🎵 *.pitch <mp3/vn>*
│┊➺ 🔊 *.highpass <mp3/vn>*
│┊➺ 🌀 *.lowpass <mp3/vn>*
│┊➺ 🌊 *.underwater <mp3/vn>*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙊𝙏𝙍𝙊 🌀◂◂
│┊➺ 🧮 *.eval <expresión matemática>*
│┊➺ 🆔 *.fakeid <nombre>*
│┊➺ 🌐 *.googledoodle*
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙

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
