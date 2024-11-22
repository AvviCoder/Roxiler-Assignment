const dataSchema = require("../Models/dataModel");

// controller for fetching the data based on parameter 
const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;

    // Construct the query for search functionality
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch the filtered documents based on the query
    const dataFetched = await dataSchema
      .find(query)
      .skip((page - 1) * perPage) // Pagination logic
      .limit(parseInt(perPage)); // Limiting the number of items per page

    // Response with data and pagination info.
    res.json({
      success: true,
      data: dataFetched,
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching the filtered data",
      error: error.message,
    });
  }
};

// controller for getting the statics of the selected month
const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Please enter the required month",
      });
    }

    // // Parse the month to get its index
    const monthIndex = new Date(`${month} 1, 2024`).getMonth();

    console.log(`Month Index: ${monthIndex}`);
    console.log(`Start Date: ${new Date(2024, monthIndex, 1)}`);
    console.log(`End Date: ${new Date(2024, monthIndex + 1, 1)}`);

    const filteredData = await dataSchema.find({
      dateOfSale: {   // items data for the selected month
        $gte: new Date(2024, monthIndex, 1),
        $lt: new Date(2024, monthIndex + 1, 1),
      },
    });

    console.log(`Filtered Data:`, filteredData);

    const totalSale = filteredData.reduce((acc, curr) => acc + curr.price, 0); // total amount of sale
    const soldItems = filteredData.filter((item) => item.sold).length;  // no of items sold in a particular month
    const unSoldItems = filteredData.filter((item) => !item.sold).length;  // no. of unsold items in a particular month

    return res.status(200).json({
      totalSale,
      soldItems,
      unSoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching the filtered data",
    });
  }
};


// controller for fetching the data for creating barChart
const getBarChart = async (req, res) => {
  const { month } = req.query;
  try {
    if (!month) {
      res.status(404).json({
        success: false,
        message: "Please enter the month",
      });
    }

    const monthIndex = new Date(`${month} 1, 2024`).getMonth();
    console.log(`The entered MonthIndex is : ${monthIndex}`);

    const filteredData = await dataSchema.find({
      dateOfSale: {
        $gte: new Date(2024, monthIndex, 1),
        $lt: new Date(2024, monthIndex + 1, 1),
      },
    });
    console.log(`the filteredDate length is : ${filteredData.length}`);
    console.log(`Filtered Data : ${filteredData}`);

    const ranges = [
      { range: "0-100", count: 0 },
      { range: "101-200", count: 0 },
      { range: "201-300", count: 0 },
      { range: "301-400", count: 0 },
      { range: "401-500", count: 0 },
      { range: "501-600", count: 0 },
      { range: "701-800", count: 0 },
      { range: "901-above", count: 0 },
    ];

    filteredData.forEach((item) => {   // for creating the range for barChart data
      const price = item.price;
      if (price >= 0 && price <= 100) ranges[0].count++;
      else if (price <= 200) ranges[1].count++;
      else if (price <= 300) ranges[2].count++;
      else if (price <= 400) ranges[3].count++;
      else if (price <= 500) ranges[4].count++;
      else if (price <= 600) ranges[5].count++;
      else if (price <= 700) ranges[6].count++;
      else if (price <= 800) ranges[7].count++;
      else if (price <= 900) ranges[8].count++;
      else ranges[9].count++;
    });

    console.log(`The final updated Range : ${ranges}`); // object format
    console.log("The final updated Range: ", JSON.stringify(ranges)); // string based populated

    res.json({
      success: true,
      ranges,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Unable to fetch the data for building bar chart",
    });
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    res.status(404).json({
      success: false,
      message: "Please enter the month",
    });
  }
  try {
    const monthIndex = new Date(`${month} 1, 2024`).getMonth();

    // code segment for monthly transaction tracking.....
    const filteredData = await dataSchema.find({
      dateOfSale: {
        $gte: new Date(2024, monthIndex, 1),
        $lt: new Date(2024, monthIndex + 1, 1),
      },
    });

    // code segment for fetching the statistics of monthly sale of products
    const totalSale = filteredData.reduce((acc, curr) => acc + curr.price, 0);
    const totalSold = filteredData.filter((item) => item.sold).length;
    const totalUnSold = filteredData.filter((item) => !item.sold).length;

    const statistics = { totalSale, totalSold, totalUnSold };

    // code segment for fetching the barchart data

    const ranges = [
      { range: "0-100", count: 0 },
      { range: "101-200", count: 0 },
      { range: "201-300", count: 0 },
      { range: "301-400", count: 0 },
      { range: "401-500", count: 0 },
      { range: "501-600", count: 0 },
      { range: "601-700", count: 0 },
      { range: "701-800", count: 0 },
      { range: "801-900", count: 0 },
      { range: "901-above", count: 0 },
    ];

    ranges.forEach((item) => {
      const price = item.price;
      if (price >= 0 && price <= 100) ranges[0].count++;
      if (price <= 200) ranges[1].count++;
      if (price <= 300) ranges[2].count++;
      if (price <= 400) ranges[3].count++;
      if (price <= 500) ranges[4].count++;
      if (price <= 600) ranges[5].count++;
      if (price <= 700) ranges[6].count++;
      if (price <= 800) ranges[7].count++;
      if (price <= 900) ranges[8].count++;
      else ranges[9].count++;
    });

    res.json({ filteredData, statistics, barChartData: ranges });
  } catch (error) {
    res.json({
      success: false,
      message: "Unable to fetch the combine data",
    });
  }
};

module.exports = {
  getTransactions,
  getStatistics,
  getBarChart,
  getCombinedData,
};
