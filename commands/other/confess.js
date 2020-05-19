const { roles, prefix, channels } = require("../../config.json");
const { dbQuery } = require("../../coreFunctions");
module.exports = {
	controls: {
		name: "confess",
		permission: 10,
		aliases: ["confession"],
		usage: "confess",
		description: "Enters the promot to submit a confession in DMs",
		enabled: false
	},
	do: async (message, client, args, Discord) => {
		message.delete();
		let qUserDB = await dbQuery("User", { id: message.author.id });
		if (qUserDB.confession_banned) return message.author.send(":x: You are blocked from submitting confessions.");
		let embed = new Discord.MessageEmbed()
			.setTitle("Confession")
			.setDescription(`What would you like to confess? Reply to this message to submit your confession.\n\nYour confession will be __anonymously__ posted to <#${channels.confessions}> as soon as you reply.\n> **Note:** Your confession will be logged in a private staff channel with your user information for moderation purposes.`)
			.setFooter("You have 1 minute to respond - type \"cancel\" to abort");
		message.author.send(embed).then(sent => {
			sent.channel.awaitMessages(response => response.author.id === message.author.id, {
				max: 1,
				time: 60000,
				errors: ["time"],
			}).then(async (collected) => {
				if (!collected.first().content.split(" ")[0]) return;
				if (collected.first().content.toLowerCase() === "cancel") return sent.channel.send(":+1: Cancelled");
				if (collected.first().content.toLowerCase() === "the cake is a lie") {
					message.member.roles.add(roles.cake);
					return sent.channel.send(":cake:");
				}
				let confessEmbed = new Discord.MessageEmbed()
					.setTitle("Anonymous Confession")
					.setDescription(`"${collected.first().content}"`)
					.setColor("RANDOM")
					.setTimestamp();
				client.channels.cache.get(channels.confessions).send(confessEmbed);
				confessEmbed.addField("User", `||${message.author.tag} (<@${message.author.id}>)||`)
					.addField("ID", `||${message.author.id}||`);
				client.channels.cache.get(channels.confession_logs).send(confessEmbed);
				return sent.channel.send(`:+1: Your confession has been added to <#${channels.confessions}>!`);
			}).catch(() => {
				return sent.channel.send(`:x: Your confession timed out. If you'd still like to submit a confession, just run \`${prefix}confess\` again in a server channel!`);
			});
		}).catch(() => {
			message.reply("I wasn't able to DM you in order to complete your confession! Please ensure that your DMs are unlocked and try again!").then(m => setTimeout(function() {
				m.delete()
			}, 5000));
		});
	}
};
