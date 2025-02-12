const express = require('express')
const cors = require('cors')
const pool = require("./db.cjs");

/*
create an instance of an express application, which lets you do things such as 
set API endpoints for URLs, specifying GET, POST, PUT, DELETE, and also start
the server via app.listen()
*/
const app = express()

//uses cors headers to allow requests between servers
app.use(cors())

// POST endpoint
app.post("/meetings", async (req, res) => {
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