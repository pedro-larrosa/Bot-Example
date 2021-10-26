const { TOKEN, GUILD_ID, CLIENT_ID } = require("./config");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
    {
        name: "piterbito",
        description: "EL PASES LO HIZO DE NUEVO"
    },
    {
        name: "ping",
        description: "PONG!"
    }
];

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
