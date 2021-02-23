const { fetchUser } = require("../../coreFunctions.js");
module.exports = {
	controls: {
		name: "hug",
		permission: 10,
		usage: "hug <user>",
		description: ":heart:",
		enabled: false
	},
	do: async (message, client, args, Discord) => {
		if (!args[0]) return message.channel.send(":x: You must specify a user to hug!");
		let user = await fetchUser(args[0], client);
		let embed = new Discord.MessageEmbed()
			.setColor("#d62448")
			.setFooter("❤️")
			.setTimestamp()
			.setDescription(`<a:hug:616240950473129986> <@${message.author.id}> hugged ${user ? `<@${user.id}>` : `**${args[0]}**`}!`);
		message.delete();
		message.channel.send(embed);
	}
};
