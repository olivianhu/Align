const express = require('express')
const cors = require('cors')
const pool = require("./db.cjs");

/*
create an instance of an express application, which lets you do things such as 
set API endpoints for URLs, specifying GET, POST, PUT, DELETE, and also start
the server via app.listen()
*/
const app = express()

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: "GET,POST,PUT,DELETE",  // Allow specific HTTP methods
  allowedHeaders: "Content-Type",  // Allow certain headers
};

app.use(cors(corsOptions));
app.use(express.json());

// POST endpoint
app.post("/meetings", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { name, timeRange, dateRange, user } = req.body;

  try {
    const query = `
      INSERT INTO meetings (name, time_range, date_range, user_id)
      VALUES ($1, $2::tstzrange, $3::daterange, $4)
      RETURNING *;
    `;

    const values = [name, timeRange, dateRange, user];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});


const port = 5000
const host = 'localhost'
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})