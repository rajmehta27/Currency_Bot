# Discord Bot Code Guide

Welcome to the Discord Bot Code Guide! This guide will help you set up and utilize a Discord bot with various functionalities. The bot includes commands for managing user balances, daily rewards, donations, a shop system, and more. Let's get started! 🤖✨

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up](#setting-up)
- [Commands](#commands)
  - [Admin](#admin)
  - [Balance](#balance)
  - [Daily](#daily)
  - [Donate](#donate)
  - [Embed](#embed)
  - [Gamble](#gamble)
  - [Leaderboard](#leaderboard)
  - [Ping](#ping)
  - [Shop](#shop)

---
## Prerequisites

Before setting up the bot, ensure you have the following:

- Discord Developer Account
- MongoDB Database
- Node.js and npm installed
- Visual Studio Code or any other preferred code editor

---
## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install required dependencies using npm:
<br>npm install discord.js
<br>npm install dotenv
<br>npm install mongoose
<br>npm install mongodb
<br>npm install parse-ms-2
<br>npm install --save-dev eslint

---
## Setting Up

Follow these steps to set up the bot:

1. **Create a Discord Application**:
- Go to the [Discord Developer Portal](https://discord.com/developers/applications).
- Create a new application and navigate to the "Bot" tab.
- Copy the bot token. **Note:** Keep your token secure and never share it publicly.

---
2. **Set Up MongoDB**:
- Install MongoDB on your system or use a cloud-based MongoDB service.
- Obtain your MongoDB server ID (global IP address).

---
3. **Configure Environment Variables**:
- Create a `.env` file in the project root.
- Add the following variables to the `.env` file:

<br>DISCORD_TOKEN=your_discord_bot_token
<br>GUILD_ID=your_discord_guild_id
<br>CLIENT_ID=your_discord_bot_client_id
<br>MONGODB_URI=your_mongodb_server_url

---
4. **Deploy Commands**:
- Run the following command to deploy bot commands: node deploy-commands.js

---
5. **Start the Bot**:
- Run the bot using the command: **node index.js** and then **node .** to start the bot

---
6. **Host the Bot Live**:
- Deploy the bot to your preferred hosting service. Ensure it has access to MongoDB and your Discord server.

---
## Commands

### Admin

- **Description**: Admin commands for managing user balances.
- **Usage**: `\admin <add/subtract> <user_mention> <amount>`
- **Example**: `admin add @user 100`

### Balance

- **Description**: Check the number of coins a user has.
- **Usage**: `\balance`
- **Example**: `balance`

### Daily

- **Description**: Redeem coins on a daily basis.
- **Usage**: `\daily`
- **Example**: `daily`

### Donate

- **Description**: Donate coins to other users.
- **Usage**: `\donate <user_mention> <amount>`
- **Example**: `donate @recipient 50`

### Embed

- **Description**: Set up a shop displaying specific products.
- **Usage**: `\embed`
- **Example**: `embed`

### Gamble

- **Description**: Gamble coins for a chance to double, lose half, or lose all coins.
- **Usage**: `\gamble`
- **Example**: `gamble`

### Leaderboard

- **Description**: Check who has earned the most coins.
- **Usage**: `\leaderboard`
- **Example**: `leaderboard`

### Ping

- **Description**: Test command for checking bot responsiveness.
- **Usage**: `\ping`
- **Example**: `ping`

### Shop

- **Description**: Buy or redeem products from the shop.
- **Usage**: `\shop`
- **Example**: `shop`

Congratulations! Your bot is now set up and ready to use. Explore the various commands and customize them according to your server's needs. If you encounter any issues or have questions, feel free to reach out. Enjoy! 🚀🎉
