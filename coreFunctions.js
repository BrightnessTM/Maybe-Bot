const { roles, err_hook, developer } = require("./config.json");
const Discord = require("discord.js");
let models = require("./utils/schemas");
const { promises } = require("fs");
const { resolve } = require("path");

module.exports = {
	/**
	 * Returns permission level of inputted ID
	 *
	 * 11 - Blacklisted\
	 * 10 - Everyone\
	 * 3 - Server staff\
	 * 2 - Server Admin\
	 * 1 - Global Permissions\
	 * 0 - Developer/Global Admin
	 *
	 * @param member - Member object fetched from a server
	 * @param client - The Discord client
	 * @returns {Promise<number>}
	 */
	checkPermissions: async (member, client) => {
		if (!member || !member.id || !client) return 10;
		if (developer.includes(member.id)) return 0;
		if (member.roles.cache.has(roles.staff)) return 1;
		return 10;
	},
	permLevelToRole: (permLevel) => {
		switch (permLevel) {
		case -1:
			return "No Users";
		case 0:
			return "Bot Administrator";
		case 1:
			return "Server Staff";
		case 10:
			return "All Users";
		default:
			return "Undefined";
		}
	},
	errorLog: (err, type, footer) => {
		if (!err) return;
		let errorText = "Error Not Set";
		if (err.stack) {
			console.error((require("chalk")).red(err.stack));
			errorText = err.stack;
		} else if (err.error) {
			console.error((require("chalk")).red(err.error));
			errorText = err.error;
		} else return;
		let embed = new Discord.MessageEmbed()
			.setAuthor(type)
			.setTitle(err.message ? err.message.substring(0, 256) : "No Message Value")
			.setDescription(`\`\`\`js\n${(errorText).length >= 1000 ? (errorText).substring(0, 1000) + " content too long..." : err.stack}\`\`\``)
			.setColor("DARK_RED")
			.setTimestamp()
			.setFooter(footer);

		let hook = new Discord.WebhookClient(err_hook.id, err_hook.token);
		hook.send(embed);
	},
	/**
	 * Fetch a user
	 * @param {string} id - The Discord ID of the user
	 * @param {module:"discord.js".Client} client - The bot client
	 * @returns {Collection}
	 */
	async fetchUser(id, client) {
		if (!id) return null;
		let foundId;
		let matches = id.match(/^<@!?(\d+)>$/);
		if (!matches) foundId = id;
		else foundId = matches[1];

		function fetchUnknownUser(uid) {
			return client.users.fetch(uid, true)
				.then(() => {
					return client.users.cache.get(uid);
				})
				.catch(() => {
					return null;
				});
		}

		return client.users.cache.get(foundId)
			|| fetchUnknownUser(foundId)
			|| null;
	},
	/**
	 * Search the database for an id, creates a new entry if not found
	 * @param {string} collection - The collection to query.
	 * @param  {Object} query - The term to search for
	 * @returns {Object}
	 */
	dbQuery: async (collection, query) => {
		return await models[collection].findOne(
			query
		)
			.then((res) => {
				if (!res) {
					return new models[collection](
						query
					).save();
				}
				return res;
			}).catch((error) => {
				console.log(error);
			});
	},
	/**
	 * Search the database for some parameters and return all entries that match, does not create a new entry if not found
	 * @param {string} collection - The collection to query.
	 * @param  {Object} query - The term to search for
	 * @returns {Object}
	 */
	dbQueryAll: async (collection, query) => {
		return await models[collection].find(
			query
		)
			.then((res) => {
				if (!res) {
					return null;
				} else {
					return res;
				}
			}).catch((error) => {
				console.log(error);
			});
	},
	/**
	 * Search the database for some parameters, returns one entry and does not create a new entry if not found
	 * @param {string} collection - The collection to query.
	 * @param  {Object} query - The term to search for
	 * @returns {Object}
	 */
	dbQueryNoNew: async (collection, query) => {
		if (!models[collection]) return 0;
		return await models[collection].findOne(
			query
		)
			.then((res) => {
				if (!res) {
					return null;
				} else {
					return res;
				}
			}).catch((error) => {
				console.log(error);
			});
	},
	/**
	 * Modify the database by providing either the userId or serverId
	 * @param {string} collection - Who should be modified, user or server.
	 * @param  {Snowflake | string} id - The id of the user/server
	 * @param {Object} modify - Should the user/server be blocked or unblocked
	 * @returns {Object}
	 */
	dbModifyId: async (collection, id, modify) => {
		modify.id = id;
		return await models[collection].findOne({
			id: id
		})
			.then(async (res) => {
				if (!res) {
					return new models[collection](
						modify
					).save();
				}
				await res.update(modify);
				return res;
			});
	},
	/**
	 * Modify the database by providing either the userId or serverId.
	 *
	 * *Note: Does not create new if not found.*
	 * @param {string} collection - Who should be modified, user or server.
	 * @param {Object} term - Which to modify
	 * @param {Object} query - Which to modify
	 * @param {Object} modify - What to change it to
	 * @returns {Promise}
	 */
	dbModify(collection, query, modify) {
		return models[collection].findOneAndUpdate(query, modify)
			.then((res) => {
				return res;
			});
	},
	/**
	 * Delete one document
	 * @param {string} collection - Which collection the document is in
	 * @param {Object} query - Which to delete
	 * @returns {Promise<void>}
	 */
	dbDeleteOne: async (collection, query) => {
		return await models[collection].findOne(
			query
		)
			.then(async (res) => {
				if (!res) return undefined;
				await res.deleteOne();
				return res;
			});
	}
};
/**
 * Like readdir but recursive 👀
 * @param {string} dir
 * @returns {Promise<string[]>} - Array of paths
 */
const fileLoader = async function* (dir) {
	const files = await promises.readdir(dir, { withFileTypes: true });
	for (let file of files) {
		const res = resolve(dir, file.name);
		if (file.isDirectory()) {
			yield* fileLoader(res);
		} else {
			yield res;
		}
	}
};

module.exports.fileLoader = fileLoader;
