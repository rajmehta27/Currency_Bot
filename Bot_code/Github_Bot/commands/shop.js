const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");
const { customRoleCost, CustomRoleEditCost } = require("../shopPrices.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("A shop where you can spend your coins")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("custom-role")
        .setDescription(`Buy or edit custom role for ${customRoleCost} coins`)
        .addStringOption((option) =>
          option
            .setName("action")
            .setDescription("Choose to edit or buy a custom role")
            .addChoices(
              {
                name: `Buy Role (${customRoleCost} coins)`,
                value: "buy",
              },
              {
                name: `Edit Role (${CustomRoleEditCost} coins)`,
                value: "edit",
              }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Choose the name of your role")
            .setMinLength(1)
            .setMaxLength(25)
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("color")
            .setDescription("Choose the color for your role")
            .addChoices(
              { name: "Red", value: "FF0000" },
              { name: "Cyan", value: "00FFFF" },
              { name: "Blue", value: "0000FF" },
              { name: "Yellow", value: "FFFF00" },
              { name: "Magenta", value: "FF00FF" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("custom-role-remove")
        .setDescription("Delete your custom role for FREE")
    ),
  async execute(interaction, profileData) {
    const { balance, userId, customRoleId } = profileData;
    const shopCommand = interaction.options.getSubcommand();

    if (shopCommand === "custom-role") {
      const action = interaction.options.getString("action");
      const name = interaction.options.getString("name");
      const color = interaction.options.getString("color");

      if (action === "edit") {
        if (customRoleId === "") {
          await interaction.deferReply({ ephemeral: true });
          return await InteractionResponse.editReply(
            "You need to buy a custom role first"
          );
        } else if (balance < CustomRoleEditCost) {
          await interaction.deferReply({ ephemeral: true });
          return await interaction.editReply(
            `You nedd ${CustomRoleEditCost} coins to edit a custom role`
          );
        }

        await interaction.deferReply();

        const customRole = await interaction.guild.roles.fetch(customRoleId);

        customRole.edit({ name, color });

        await profileModel.findOneAndUpdate(
          {
            userId,
          },
          {
            $inc: {
              balance: -CustomRoleEditCost,
            },
          }
        );

        await interaction.editReply("Successfully edited a custom role");
      }

      if (action === "buy") {
        if (customRoleId !== "") {
          await interaction.deferReply({ ephemeral: true });
          return await interaction.editReply(
            "You already have a custom role..."
          );
        }
        if (balance < customRoleCost) {
          await interaction.deferReply({ ephemeral: true });
          return await interaction.editReply(
            `You need ${customRoleCost} coins to buy a custom role`
          );
        }

        await interaction.deferReply();

        const customRole = await interaction.guild.roles.create({
          name,
          permissions: [],
          color,
        });

        interaction.member.roles.add(customRole);

        await profileModel.findOneAndUpdate(
          {
            userId,
          },
          {
            $set: {
              customRoleId: customRole.id,
            },
            $inc: {
              balance: -customRoleCost,
            },
          }
        );

        await interaction.editReply("Successfully purchased a custom role");
      }
    }

    if (shopCommand === "custom-role-remove") {
      if (customRoleId === "") {
        await interaction.deferReply({ ephemeral: true });
        return interaction.editReply("You do not have a custom role");
      }

      await interaction.deferReply();

      const customRole = await interaction.guild.roles.fetch(customRoleId);

      customRole.delete();

      await profileModel.findOneAndUpdate(
        {
          userId,
        },
        {
          $set: {
            customRoleId: "",
          },
        }
      );

      await interaction.editReply("Your custom role has been deleted");
    }
  },
};
