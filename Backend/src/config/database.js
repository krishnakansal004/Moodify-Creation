const moongoose = require("mongoose");

async function connectToDB() {
  await moongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
}

module.exports = connectToDB;
