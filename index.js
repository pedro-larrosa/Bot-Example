const fs = require("fs");
const { TOKEN, GUILD_ID, CLIENT_ID } = require("./config");
const { Client, Intents, Collection } = require("discord.js");
const geolib = require("geolib");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const prefix = "!";
module.exports = prefix;

//Lee los ficheros de los comandos en el directorio /comandos
client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./comandos")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);

    client.commands.set(command.data.name, command);
}

//Leemos los ficheros de del directorio eventos para generar los eventos
const eventFiles = fs
    .readdirSync("./eventos")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./eventos/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// Login to Discord with your client's token
client.login(TOKEN);
