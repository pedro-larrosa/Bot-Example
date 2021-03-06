const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { TOKEN, CLIENT_ID, GUILD_ID } = require("./config.json");

let commands = [];

//Lee los comandos de los ficheros de el directorio /comandos
const commandFiles = fs
    .readdirSync("./comandos")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands
})
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
