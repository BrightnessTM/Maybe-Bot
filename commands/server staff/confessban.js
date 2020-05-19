const { dbQuery, dbModify, fetchUser } = require("../../coreFunctions");
module.exports = {
	controls: {
		name: "confessban",
		permission: 1,
		aliases: ["cban"],
		usage: "confessban <user>",
		description: "Disallows a user from submitting a confession",
		enabled: false,
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
		cooldown: 5
	},
	do: async (message, client, args) => {
		let user = await fetchUser(args[0], client);
		if (!user) return message.channel.send(":x: Invalid user");
		let qUserDB = await dbQuery("User", { id: user.id });
		if (qUserDB.confession_banned) return message.channel.send(`:x: **${user.tag}** is already blocked from sending confessions.`, { disableMentions: "everyone" });
		qUserDB.confession_banned = true;
		await dbModify("User", { id: user.id }, qUserDB);
		return message.channel.send(`:ok_hand: Blacklisted **${user.tag}** (\`${user.id}\`) from submitting confessions.`, {disableMentions: "everyone"});
	}
};