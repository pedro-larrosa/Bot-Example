const { Client, Intents } = require("discord.js");
const { TOKEN } = require("./config");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "piterbito") {
        await interaction.reply("EL PASES LO HA HECHO DE NUEVO");
    } else if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});

client.login(TOKEN);
