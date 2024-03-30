## Bot Activation Guide 🤖

Welcome to the activation guide for our Discord bot! Follow these steps to set up and activate the bot successfully.
---
### 1. Create Discord Application and Obtain Bot Token 🔑

- Navigate to the Discord Developer Portal.
- Create a new application and then proceed to the "Bot" section.
- If the bot token is not visible, reset and copy it immediately.
  - **Warning:** Ensure that you do not share this token with anyone!

---
### 2. Set Up MongoDB Database 📊

- Set up a MongoDB database along with its IP address.
  - Use a global IP address to ensure the bot works on any network when live.

---
### 3. Create `.env` File with Required Details 📝

- Create a file named `.env` in your project directory.
- Add the following details to the `.env` file:
  - `DISCORD_TOKEN`: Paste the Discord token obtained from the Developer Portal.
  - `GUILD_ID`: Activate developer settings on Discord to get your server ID (where the bot will be set up).
  - `CLIENT_ID`: Copy the User ID of the bot after inviting it to your server.
  - `MONGODB_SERVER_ID`: Copy the MongoDB database server ID and paste it in the `.env` file.

---
### 4. Set Up Environment and Dependencies 🛠️

- Ensure you have Node.js and npm installed on your system.
- Use a code editor like VS Code for easier setup.
- Install the following dependencies by running these commands in your terminal:

-npm install discord.js
-npm install --save-dev eslint
-npm install dotenv
-npm install mongoose
-npm install mongodb
-npm install parse-ms-2

---
### 5. Start the Bot 🚀

- Run the following commands in your terminal:
-node index.js
-node deploy-commands.js
-node .

- This sets up all the commands of the bot and starts the bot. You can now start testing it!

---
### 6. Host the Bot Live 🌐

- Once the bot is running smoothly, you can host it live on your server for uninterrupted access.

---
### Important Note:
- Make sure to keep your bot token and sensitive information secure.
- Double-check your configurations to ensure smooth operation.
- For any issues or questions, refer to the documentation or contact the bot developer.

Now your Discord bot is ready! Have fun 🎉.
