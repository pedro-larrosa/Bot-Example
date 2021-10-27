let prefix = require(__dirname + "/../index.js");
const randomWords = require("random-spanish-words");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.author.bot) return;

        if (message.content === `${prefix}mensaje`)
            message.channel.send(randomWords());
    }
};
