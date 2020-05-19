const { dbQuery, dbModify, checkPermissions, errorLog } = require("../coreFunctions");
const { prefix: defaultPrefix } = require("../config.json");
const { Collection } = require("discord.js");

module.exports = async (Discord, client, message) => {
	if (message.author.bot === true) return;

	const permission = await checkPermissions(message.member, client);

	const publicPrefixes = [defaultPrefix, `<@${client.user.id}>`, `<@!${client.user.id}>`];

	const prefixes = publicPrefixes.map(p => p.toLowerCase());
	const lcContent = message.content.toLowerCase();

	const prefix = prefixes.find(p => lcContent.startsWith(p));

	if (!lcContent.startsWith(prefix)) return;

	const [commandName, ...args] = message.content.slice(prefix.length).trim().split(" ");

	const command = client.commands.find((c) => c.controls.name.toLowerCase() === commandName || c.controls.aliases && c.controls.aliases.includes(commandName));
	if (!command) return;

	if (command.controls.enabled === false) return message.channel.send(":x: This command is currently disabled.");

	if (permission > command.controls.permission) return;

	try {
		return command.do(message, client, args, Discord);
	} catch (err) {
		message.channel.send(":x: Something went wrong with that command, please try again later.");
		errorLog(err, "Command Handler", `Message Content: ${message.content}`);
	}
};
