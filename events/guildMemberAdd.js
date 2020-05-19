const { channels } = require("../config.json");
module.exports = async (Discord, client, member) => {
	if (member.user.bot) return;
	let embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setDescription(`**<a:hug:616240950473129986> __New Member__!**\n→ Hi there, <@${member.id}>! Welcome to **${member.guild.name}**. Please read <#605188376970264612>, get yourself some <#605188421413109760> and say hi in <#617976147745046554>.`);
	client.channels.cache.get(channels.welcome).send(`<@${member.id}> <@&671189806964801547> <a:jessping:635054507998576641>`, embed);
};