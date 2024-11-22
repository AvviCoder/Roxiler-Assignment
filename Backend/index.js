const express = require("express");
const app = express();      //initialising the app
const dbConnector = require("./Config/dbConnector");
require("dotenv").config();
const cors = require("cors");

dbConnector();  // establishing connection with database

// essential middlewares of the system
app.use(express.json());
app.use(cors());

// importing routes for the api
const seedDataRoute = require("./Routes/seedDataRoute");
const dataTransactionRoutes = require("./Routes/transactionRoute");

// mounting the routes 
app.use("/api/seed", seedDataRoute);
app.use("/api/transaction", dataTransactionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The Server has started running on Port ${PORT}`);
});
