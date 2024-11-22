const seedData = require("../Seed/seedData");

// controller for pushing the data into the database
const seedDataBase = async (req, res) => {
  try {
    await seedData();
    res
      .status(200)
      .json({
        success: true,
        message: "The data has has been successfully seeded into the database",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error occuered while seeding the data",
      });
  }
};

module.exports = seedDataBase;
