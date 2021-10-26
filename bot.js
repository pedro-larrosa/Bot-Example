const { Client, Intents } = require("discord.js");
const { TOKEN } = require("./config");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});

client.on("message", async (message) => {
    if (message.content === "ping") {
        await message.reply("CABRON");
    }
});

client.login(TOKEN);
