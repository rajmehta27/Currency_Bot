const { SlashCommandBuilder } = require("discord.js");
const parseMilliseconds = require("parse-ms-2");
const profileModel = require("../models/profileSchema");
const { dailyMin, dailyMax } = require("../globalValues.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register yourself to redeem coins"),
  async execute(interaction, profileData) {
    const { id } = interaction.user;
    const { dailyLastUsed } = profileData;

    const cooldown = 86400000;
    const timeLeft = cooldown - (Date.now() - dailyLastUsed);

    const existingProfile = await profileModel.findOne({ userId: id });

    if (existingProfile) {
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply(`You are already registered`);
    }

    await interaction.deferReply();

    try {
      await profileModel.findOneAndUpdate(
        { userId: id },
        {
          $set: {
            dailyLastUsed: Date.now(),
          },
          $inc: {
            balance: 10,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    await interaction.editReply(
      `You have registered yourself successfully. You redeemed ${randomAmt} coins!.`
    );
  },
};
