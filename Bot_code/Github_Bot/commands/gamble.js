const { SlashCommandBuilder, ButtonStyle } = require("discord.js");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamble")
    .setDescription("Gamble with your coins")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("three-doors")
        .setDescription("Can double, half or lose your gamble")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Choose the amount you want to gamble")
            .setMaxValue(100)
            .setMinValue(2)
            .setRequired(true)
        )
    ),
  async execute(interaction, profileData) {
    const { username, id } = interaction.user;
    const { balance } = profileData;

    const gambleCommand = interaction.options.getSubcommand();

    const gambleEmbed = new EmbedBuilder().setColor(0x00aa6d);

    if (gambleCommand === "three-doors") {
      const amount = interaction.options.getInteger("amount");

      if (balance < amount) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply(
          `You don't have ${amount} coins to gamble with`
        );
      }

      await interaction.deferReply();

      const Button1 = new ButtonBuilder()
        .setCustomId("one")
        .setLabel("Door 1")
        .setStyle(ButtonStyle.Primary);

      const Button2 = new ButtonBuilder()
        .setCustomId("two")
        .setLabel("Door 2")
        .setStyle(ButtonStyle.Primary);

      const Button3 = new ButtonBuilder()
        .setCustomId("three")
        .setLabel("Door 3")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(
        Button1,
        Button2,
        Button3
      );

      gambleEmbed
        .setTitle(`Playing three doors for ${amount} coins`)
        .setFooter({
          text: "Each door has DOUBLE COINS, LOSE HALF, or LOSE ALL",
        });

      await interaction.editReply({ embeds: [gambleEmbed], components: [row] });

      //gather message we just sent ^^
      const message = await interaction.fetchReply();

      const filter = (i) => i.user.id === interaction.user.id;

      const collector = message.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      const double = "DOUBLE COINS";
      const half = "LOSE HALF";
      const lose = "LOSE ALL";

      const getAmount = (label, gamble) => {
        let amount = -gamble;
        if (label === double) {
          amount = gamble;
        } else if (label === half) {
          amount = -Math.round(gamble / 2);
        }
        return amount;
      };

      let choice = null;

      collector.on("collect", async (i) => {
        let options = [Button1, Button2, Button3];

        const randIdxDouble = Math.floor(Math.random() * 3);
        const doubleButton = options.splice(randIdxDouble, 1)[0];
        doubleButton.setLabel(double).setDisabled(true);

        const randomIdxHalf = Math.floor(Math.random() * 2);
        const halfButton = options.splice(randomIdxHalf, 1)[0];
        halfButton.setLabel(half).setDisabled(true);

        const zeroButton = options[0];
        zeroButton.setLabel(lose).setDisabled(true);

        Button1.setStyle(ButtonStyle.Secondary);
        Button2.setStyle(ButtonStyle.Secondary);
        Button3.setStyle(ButtonStyle.Secondary);

        if (i.customId === "one") choice = Button1;
        else if (i.customId === "two") choice = Button2;
        else if (i.customId === "three") choice = Button3;

        choice.setStyle(ButtonStyle.Success);

        const label = choice.data.label;
        const amtChange = getAmount(label, amount);

        await profileModel.findOneAndUpdate(
          {
            userId: id,
          },
          {
            $inc: {
              balance: amtChange,
            },
          }
        );

        if (label === double) {
          gambleEmbed
            .setTitle("DOUBLED! You just doubled your gamble")
            .setFooter({ text: `${username} gained ${amtChange} coins` });
        } else if (label === half) {
          gambleEmbed
            .setTitle("Well... You just lost half your gamble")
            .setFooter({ text: `${username} lost ${amtChange} coins` });
        } else if (label === lose) {
          gambleEmbed
            .setTitle("Oof... You just lost your entire gamble")
            .setFooter({ text: `${username} lost ${amtChange} coins` });
        }

        await i.update({ embeds: [gambleEmbed], components: [row] });
        collector.stop();
      });
    }
  },
};
