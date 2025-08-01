const handler = async (m, {conn, text, command, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.gc_unwarn

  const pp = './src/assets/images/menu/main/warn.jpg';
  let who;
  if (m.isGroup) who = await await m.mentionedJid[0] ? await await m.mentionedJid[0] : m.quoted ? await m?.quoted?.sender : text;
  else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const warntext = `${tradutor.texto1}\n*${usedPrefix + command} @${global.suittag}*`;
  if (!who) throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  if (await m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warn == 0) throw tradutor.texto2;
  user.warn -= 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`}${tradutor.texto3} ${user.warn}/3*`, null, {mentions: [who]});
};
handler.tags = ['group'];
handler.help = ['unwarn'];
handler.command = /^(unwarn|delwarn|deladvertir|deladvertencia|delwarning)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
