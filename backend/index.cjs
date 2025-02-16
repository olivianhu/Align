const express = require('express')
const cors = require('cors')
const pool = require("./db.cjs");


const app = express()

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));
app.use(express.json());

// POST endpoint
app.post("/meetings", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { name, startTime, endTime, dateRange, user } = req.body;

  try {
    const query = `
      INSERT INTO meetings (name, start_time, end_time, date_range, user_id)
      VALUES ($1, $2, $3, $4::daterange, $5)
      RETURNING *;
    `;

    const values = [name, startTime, endTime, dateRange, user];
    const result = await pool.query(query, values);
    // console.log(result);

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