const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Shows a user their balance"),
  async execute(interaction, profileData) {
    const { balance } = profileData;
    const username = interaction.user.username;
    console.log(interaction);
    await interaction.reply(`${username} has ${balance} coins`);
  },
};
