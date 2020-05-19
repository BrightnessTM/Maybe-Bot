const { Schema, model } = require("mongoose");
// IMPORTANT: Snowflakes MUST be Strings, not Numbers

const user = new Schema({
	id: { type: String, required: true }, // user id
	introduction_submitted: { type: Boolean, default: false },
	confession_banned: { type: Boolean, default: false }
});

module.exports = {
	User: model("user", user, "users")
};
