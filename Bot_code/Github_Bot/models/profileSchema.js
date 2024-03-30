const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, require: true, unique: true },
  serverId: { type: String, require: true },
  balance: { type: Number, default: 10 },
  dailyLastUsed: { type: Number, default: 0 },
  customRoleId: { type: String, default: "" },
});

const model = mongoose.model("CurrencyDB", profileSchema);

module.exports = model;
