const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Shows an example of an embed"),
  async execute(interaction) {
    const myEmbed = {
      color: 0xfa8072,
      title: "Embed Title",
      url: "https://youtube.com/@designaretutorials",
      author: {
        name: "Author Name",
        icon_url:
          "https://yt3.googleusercontent.com/-MCFU0Zm92zqZ5LP-D_sv3yHYoJYBsqPqNMcDv76nOGX9QpmIdKD44LAthIinH8Qz-EnflGaCw=s176-c-k-c0x00ffffff-no-rj",
        url: "https://youtube.com/@designaretutorials",
      },
      description: "Embed Description Here",
      thumbnail: {
        url: "https://i.ytimg.com/vi/GLR_8QcdEJU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_tq1LEarvu49ljRd4BwFusWChrA",
      },
      fields: [
        {
          name: "Normal Embed Field",
          value: "This is a regular field",
        },
        {
          name: "\u200B",
          value: "\u200B",
        },
        {
          name: "Inline Embed Field",
          value: "This is a inline field",
          inline: true,
        },
        {
          name: "Inline Embed Field",
          value: "This is a inline field",
          inline: true,
        },
      ],
      image: {
        url: "https://i.ytimg.com/vi/bc1lo0YLciY/hqdefault.jpg",
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: "Footer text here!",
        icon_url:
          "https://yt3.googleusercontent.com/-MCFU0Zm92zqZ5LP-D_sv3yHYoJYBsqPqNMcDv76nOGX9QpmIdKD44LAthIinH8Qz-EnflGaCw=s176-c-k-c0x00ffffff-no-rj",
      },
    };

    await interaction.reply({ embeds: [myEmbed] });
  },
};
