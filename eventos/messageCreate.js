const randomWords = require("random-spanish-words");
const prefix = require("..");

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.author.bot) return;

        if (message.content === `${prefix}mensaje`)
            message.channel.send(randomWords());
    }
};
