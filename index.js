const fs = require("fs");
const { TOKEN, GUILD_ID, CLIENT_ID } = require("./config");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Lee los ficheros de los comandos en el directorio /comandos
client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./comandos")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);

    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `Se ha producido un error ejecutando el comando${interaction.commandName}!`,
            ephemeral: true
        });
    }
});

// Login to Discord with your client's token
client.login(TOKEN);
