const { dbQuery, dbModify, fetchUser } = require("../../coreFunctions");
module.exports = {
	controls: {
		name: "confessunban",
		permission: 1,
		aliases: ["cunban"],
		usage: "confessunban <user>",
		description: "Disallows a user from submitting a confession",
		enabled: false,
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
		cooldown: 5
	},
	do: async (message, client, args) => {
		let user = await fetchUser(args[0], client);
		if (!user) return message.channel.send(":x: Invalid user");
		let qUserDB = await dbQuery("User", { id: user.id });
		if (!qUserDB.confession_banned) return message.channel.send(`:x: **${user.tag}** is not blocked from sending confessions.`, { disableMentions: "everyone" });
		qUserDB.confession_banned = false;
		await dbModify("User", { id: user.id }, qUserDB);
		return message.channel.send(`:ok_hand: **${user.tag}** (\`${user.id}\`) can now submit confessions.`, {disableMentions: "everyone"});
	}
};