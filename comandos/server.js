const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Te muestra información del servidor"),
    async execute(interaction) {
        await interaction.reply(
            `Nombre del servidor: ${interaction.guild.name}\nMiembros totales: ${interaction.guild.memberCount}`
        );
    }
};
