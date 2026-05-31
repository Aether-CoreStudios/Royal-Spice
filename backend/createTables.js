const mongoose = require("mongoose");
const Table = require("./models/Table");

mongoose.connect("YOUR_MONGODB_URL");

async function createTables() {
  for (let i = 1; i <= 10; i++) {
    await Table.updateOne(
      { tableNumber: i },
      {
        tableNumber: i,
        status: "available",
      },
      { upsert: true },
    );
  }

  console.log("Tables Created");
  process.exit();
}

createTables();
