const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("piterbito")
        .setDescription("Conocido como el pases"),
    async execute(interaction) {
        await interaction.reply("EL PASES LO HIZO DE NUEVO :sunglasses:");
    }
};
