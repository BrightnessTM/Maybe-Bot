const { permLevelToRole, checkPermissions } = require("../../coreFunctions");

const { prefix } = require("../../config.json");

module.exports = {
	controls: {
		name: "help",
		permission: 10,
		aliases: ["command", "howto", "prefix"],
		usage: "help (command name)",
		description: "Shows command information",
		enabled: true
	},
	do: async (message, client, args, Discord) => {

		let permission = await checkPermissions(message.member, client);

		if (!args[0]) {
			let embed = new Discord.MessageEmbed()
				.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL({ format: "png" }))
				.addField("General Commands", `\`${prefix}introduction\` - Starts the prompt for submitting an introduction\n\`${prefix}hug <user>\` - Gives someone a hug! <a:hug:616240950473129986>\n\`${prefix}help (command)\` - Shows this screen\n\`${prefix}ping\` - Shows bot response time`)
				.setColor("RANDOM");
			if (permission <= 1) embed.addField("Staff Commands", `\`${prefix}allowintro <user>\` - Allows a user to submit another introduction if they have already submitted one\n\`${prefix}botconfig\` - Configures various aspects of the bot`);
			if (permission === 0) embed.addField("Bot Admin Commands", `\`${prefix}reboot\` - Reboots the bot\n\`${prefix}eval\` - Runs code\n\`${prefix}deploy\` - Deploys code from GitHub\n\`${prefix}db\` - Executes database query`);

			return message.channel.send(embed);
		}

		let commandName = args[0].toLowerCase();

		const command = client.commands.find((c) => c.controls.name.toLowerCase() === commandName || c.controls.aliases && c.controls.aliases.includes(commandName));

		if (!command) return;

		let commandInfo = command.controls;

		let returnEmbed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(commandInfo.description)
			.addField("Permission Level", permLevelToRole(commandInfo.permission), true)
			.addField("Usage", `\`${prefix}${commandInfo.usage}\``, true)
			.setAuthor(`Command: ${commandName}`, client.user.displayAvatarURL({dynamic: true, format: "png"}));

		commandInfo.aliases ? returnEmbed.addField(commandInfo.aliases.length > 1 ? "Aliases" : "Alias", commandInfo.aliases.join(", ")) : "";
		if (!commandInfo.enabled) returnEmbed.addField("Additional Information", "⚠️ This command is currently disabled");

		return message.channel.send(returnEmbed);

	}
};
