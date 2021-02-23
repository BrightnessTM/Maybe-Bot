const { prefix, channels } = require("../../config.json");
const { dbQuery, dbModify } = require("../../coreFunctions");
module.exports = {
	controls: {
		name: "introduction",
		permission: 10,
		aliases: ["intro", "introductions", "introduce"],
		usage: "introduction",
		description: "Enters the prompt to create an introduction",
		enabled: true
	},
	do: async (message, client, args, Discord) => {
		let qUserDB = await dbQuery("User", { id: message.author.id });
		let color;
		let verified = false;
		let userObject = {};
		async function introduce (through, channel) {
			switch (through) {
			case 1:
				channel.send("What is your name?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(2, channel);
						}
						userObject.name = collected.first().content;
						return introduce(2, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 2:
				channel.send("What are your nicknames?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(3, channel);
						}
						userObject.nicknames = collected.first().content;
						return introduce(3, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 3:
				channel.send("What is your age?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(4, channel);
						}
						userObject.age = collected.first().content;
						return introduce(4, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 4:
				channel.send("What is your gender?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(5, channel);
						}
						userObject.gender = collected.first().content;
						return introduce(5, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 5:
				channel.send("What is your nationality?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(6, channel);
						}
						userObject.nationality = collected.first().content;
						return introduce(6, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 6:
				channel.send("What languages do you speak?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(7, channel);
						}
						userObject.languages = collected.first().content;
						return introduce(7, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 7:
				channel.send("What are your hobbies?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(8, channel);
						}
						userObject.hobbies = collected.first().content;
						return introduce(8, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 8:
				channel.send("What do you like?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(9, channel);
						}
						userObject.likes = collected.first().content;
						return introduce(9, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 9:
				channel.send("What do you dislike?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(10, channel);
						}
						userObject.dislikes = collected.first().content;
						return introduce(10, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 10:
				channel.send("What is your favorite color?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(11, channel);
						}
						userObject.color = collected.first().content;
						return introduce(11, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 11:
				channel.send("Is there any other info you'd like to include?\n> Send `skip` to not specify an answer. You have one minute to respond.").then(sent => {
					sent.channel.awaitMessages(response => response.author.id === message.author.id, {
						max: 1,
						time: 60000,
						errors: ["time"],
					}).then(async (collected) => {
						if (!collected.first().content.split(" ")[0]) return;
						if (collected.first().content.toLowerCase() === "skip") {
							sent.channel.send("Skipped");
							return introduce(12, channel);
						}
						userObject.extra = collected.first().content;
						return introduce(12, channel);
					}).catch(() => {
						return sent.channel.send(`:x: Your introduction timed out. If you'd still like to submit an introduction, just run \`${prefix}introduce\` again in a server channel!`);
					});
				});
				break;
			case 12:
				// eslint-disable-next-line no-case-declarations
				let introArr = [];
				Object.keys(userObject).forEach(key => {
					let value = userObject[key];
					switch (key) {
					case "name":
						introArr.push(`**Name:** ${value}`);
						break;
					case "nicknames":
						introArr.push(`**Nicknames:** ${value}`);
						break;
					case "age":
						introArr.push(`**Age:** ${value}`);
						break;
					case "gender":
						introArr.push(`**Gender:** ${value}`);
						break;
					case "nationality":
						introArr.push(`**Nationality:** ${value}`);
						break;
					case "languages":
						introArr.push(`**Languages:** ${value}`);
						break;
					case "hobbies":
						introArr.push(`**Hobbies:** ${value}`);
						break;
					case "likes":
						introArr.push(`**Likes:** ${value}`);
						break;
					case "dislikes":
						introArr.push(`**Dislikes:** ${value}`);
						break;
					case "color":
						introArr.push(`**Favorite Color:** ${value}`);
						break;
					case "extra":
						introArr.push(`**Extra Info:** ${value}`);
						break;
					}
				});
				if (introArr.length < 1) return channel.send(":x: You did not specify any values for your introduction, therefore nothing can be posted!");

				// eslint-disable-next-line no-case-declarations
				let embed = new Discord.MessageEmbed()
					.setAuthor(`${message.author.tag}'s Introduction`, message.author.displayAvatarURL({format: "png", dynamic: true}))
					.setFooter(verified ? "Verified" : "Unverified")
					.setColor(color)
					.setTimestamp()
					.setDescription(introArr.join("\n"));

				client.channels.cache.get(channels.introductions).send(`<@${message.author.id}>`, embed);
				qUserDB.introduction_submitted = true;
				await dbModify("User", { id: message.author.id }, qUserDB);
				return channel.send(`Your introduction has been sent to the <#${channels.introductions}> channel!`);
			}
		};
		message.delete();

		if (qUserDB.introduction_submitted) return message.channel.send(":x: You have already submitted an introduction.").then(m => setTimeout(function() {
			m.delete();
		}, 5000));

		message.author.send("Time to create an introduction! Respond with your answers to the questions the bot gives. You can skip any of them by sending `skip`.").then(sent => {
			return introduce(1, sent.channel);
		}).catch(() => {
			message.reply("I wasn't able to DM you in order to complete your introduction! Please ensure that your DMs are unlocked and try again!").then(m => setTimeout(function() {
				m.delete();
			}, 5000));
		});
	}
};
