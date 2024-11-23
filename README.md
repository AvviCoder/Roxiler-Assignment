# Roxiler's-Assignment

#Frontend
To start the frontend Use the following steps:
1. cd frontend
2. Run the command in the terminal = npm i
3. npm start

   through the above steps the app frontend will start to work

#Backend
To start the backend : split the terminal and start to the steps given below
1. cd Backend
2. Run the command in the 2nd terminal : npm i axios dotenv express nodemon mongoose react-chartjs cors
3. npm run dev

  ** Transactions API Documentation**
  Base URL: All endpoints are accessible under the base URL: http://localhost:4000.
This documentation provides an overview of the APIs used in the TransactionsPage component. Each API has been described in a simple and easy-to-follow format for seamless integration.

1. Fetch Transactions
Endpoint:
GET /api/transaction

Description:
Fetches a paginated list of transactions based on the provided query parameters.

Query Parameters:
Parameter	Type	Required	Description
page	Number	No	Current page number (default: 1).
perPage	Number	No	Number of items per page (default: 10).
search	String	No	Search term for filtering by title, description, or price.
month	String	No	Month to filter transactions (default: March).
Response:
200 OK
json
Copy code
{
  "data": [
    {
      "title": "Sample Title",
      "description": "Sample Description",
      "price": 100,
      "sold": true
    }
  ]
}
Error Response:
500 Internal Server Error: If the server encounters an issue.
2. Fetch Statistics
Endpoint:
GET /api/transaction/statistics

Description:
Retrieves the statistical data for transactions in the selected month.

Query Parameters:
Parameter	Type	Required	Description
month	String	No	Month for which statistics are required.
Response:
200 OK
json
Copy code
{
  "totalSale": 5000,
  "soldItems": 150,
  "unSoldItems": 50
}
Error Response:
500 Internal Server Error: If the server encounters an issue.
3. Fetch Bar Chart Data
Endpoint:
GET /bar-chart

Description:
Fetches data to render a bar chart for transaction performance in the selected month.

Query Parameters:
Parameter	Type	Required	Description
month	String	No	Month for which chart data is required.
Response:
200 OK
json
Copy code
{
  "ranges": [
    { "range": "0-100", "count": 25 },
    { "range": "101-200", "count": 15 }
  ]
}
Error Response:
500 Internal Server Error: If the server encounters an issue.

