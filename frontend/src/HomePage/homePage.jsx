import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";
import { Table, Button, Input } from "reactstrap";

const TransactionsPage = () => {
  // States for month selection, search query, transactions, statistics, and chart data
  const [month, setMonth] = useState("March");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    soldItems: 0,
    unSoldItems: 0,
  });
  const [barChartData, setBarChartData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const BASE_URL = "http://localhost:4000";
  // Fetch transactions, statistics, and chart data

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChart();
  }, [month, currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/transaction/`, {
        params: {
          page: currentPage || 1,
          perPage: perPage || 10,
          search: searchQuery || " ",
          month: month || "March",
        },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/transaction/statistics`,
        {
          params: { month },
        }
      );
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChart = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/transaction/bar-chart`,
        {
          params: { month },
        }
      );
      setBarChartData(response.data.ranges);
    } catch (error) {
      console.error("Error fetching bar chart:", error);
    }
  };

  // Handle search box change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 for new search
  };

  // Handle month change
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Handle pagination
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Table with pagination feature */}
      <h1>Welcome to the Roxilier Assignment</h1>
      <div>
        <label>Month:</label>
        <select value={month} onChange={handleMonthChange}>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((monthName, index) => (
            <option key={index} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
        <Input
          type="text"
          value={searchQuery}
          placeholder="Search by title, description, or price"
          onChange={handleSearch}
        />
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Button onClick={prevPage}>Previous</Button>
        <Button onClick={nextPage}>Next</Button>
      </div>

      {/* Statistics Box */}
      <div>
        <h3>Transaction Statistics</h3>
        <div>Total Sale: {statistics.totalSale}</div>
        <div>Sold Items: {statistics.soldItems}</div>
        <div>Unsold Items: {statistics.unSoldItems}</div>
      </div>

      {/* Bar Chart for the data */}
      <div>
        <h3>Transactions Bar Chart</h3>
        <Chart
          type="bar"
          data={{
            labels: barChartData.map((item) => item.range),
            datasets: [
              {
                label: "Items Count",
                data: barChartData.map((item) => item.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
