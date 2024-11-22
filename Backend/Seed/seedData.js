const dataSchema = require("../Models/dataModel");
const axios = require("axios");

// initializing the seed() to push the data into the database
const seedData = async () => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const formattedData = data.map((item) => ({
      ...item,
      dateOfSale: new Date(item.dateOfSale), // Convert to Date object
    }));
    await dataSchema.insertMany(formattedData);
    console.log("The data has been successfully seeded");
  } catch (error) {
    console.log("Error occured while seeding the data");
  }
};

module.exports = seedData;
