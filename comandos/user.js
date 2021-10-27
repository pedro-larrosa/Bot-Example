const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Te muestra información del usuario"),
    async execute(interaction) {
        await interaction.reply(
            `Tu tag: ${interaction.user.tag}\nTu id: ${interaction.user.id}`
        );
    }
};
