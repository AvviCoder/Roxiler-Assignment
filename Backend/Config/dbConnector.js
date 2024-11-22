const mongoose = require("mongoose");
require("dotenv").config();

const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("The Database is connected Successfully");
  } catch (error) {
    console.log("Error while establishing connection with DB", error.message);
    process.exit(1);
  }
};

module.exports = dbConnector;
