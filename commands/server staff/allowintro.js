const { dbQuery, dbModify, fetchUser } = require("../../coreFunctions");
module.exports = {
	controls: {
		name: "allowintro",
		permission: 1,
		aliases: ["allowintroduction"],
		usage: "allowintro <user>",
		description: "Allows a user to submit another introduction",
		enabled: true,
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
		cooldown: 5
	},
	do: async (message, client, args) => {
		let user = await fetchUser(args[0], client);
		if (!user) return message.channel.send(":x: Invalid user");
		let qUserDB = await dbQuery("User", { id: user.id });
		if (!qUserDB.introduction_submitted) return message.channel.send(`:x: **${user.tag}** has not submitted any introductions.`, { disableMentions: "everyone" });
		qUserDB.introduction_submitted = false;
		await dbModify("User", { id: user.id }, qUserDB);
		return message.channel.send(`:ok_hand: **${user.tag}** (\`${user.id}\`) can now submit another introduction.`, {disableMentions: "everyone"});
	}
};