const handler = async (m, { conn, args }) => {
  if (args.length < 2) {
    return await conn.sendMessage(m.chat, { text: '❌ Debes escribir el horario y el color de vestimenta. Ejemplo:\n\n.12vs12 23:45 negra' });
  }

  let horaMex = args[0]; // Hora ingresada (México)
  let colorVestimenta = args[1].toUpperCase(); // Color ingresado en mayúsculas

  // Validar formato de hora (HH:MM)
  if (!/^\d{1,2}:\d{2}$/.test(horaMex)) {
    return await conn.sendMessage(m.chat, { text: '⚠️ Formato de hora inválido. Usa HH:MM. Ejemplo:\n\n.12vs12 23:45 negra' });
  }

  // Convertir hora de México a Colombia (-1 hora de diferencia)
  let [horas, minutos] = horaMex.split(':').map(Number);
  let horaCol = (horas - 1 + 24) % 24; // Ajuste para evitar valores negativos

  // Formatear la hora (asegurar que siempre tenga 2 dígitos)
  let horaColStr = `${horaCol.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

  // Mensaje actualizado con tres escuadras de 4 jugadores cada una y 3 suplentes
  let lista = `
╭──────⚔──────╮
┇➤ 12 𝐕𝐒 12  
╰──────⚔──────╯

╭────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎  
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${horaMex}  
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${horaColStr}  
┇➤ 🎽 𝐕𝐄𝐒𝐓𝐈𝐌𝐄𝐍𝐓𝐀: ${colorVestimenta}  
╰────────────╯

╭───🏆 𝐄𝐒𝐂𝐔𝐀𝐃𝐑𝐀 𝟏 ───╮
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
╰────────────╯

╭───🔥 𝐄𝐒𝐂𝐔𝐀𝐃𝐑𝐀 𝟐 ───╮
┇➥ 🦥 ➤  
┇➥ 🦥 ➤   
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
╰────────────╯

╭───⚡ 𝐄𝐒𝐂𝐔𝐀𝐃𝐑𝐀 𝟑 ───╮
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
╰────────────╯

╭───🔄 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒 ───╮
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
┇➥ 🦥 ➤  
╰────────────╯

➤ 𝙈𝙀𝙎𝙄𝙏𝙊 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕
  `.trim();

  await conn.sendMessage(m.chat, { text: lista });
};

handler.command = /^(12vs12)$/i;
export default handler;
