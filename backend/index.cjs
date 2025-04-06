const express = require('express')
const cors = require('cors')
const supabase = require('./supabase.cjs');


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

  const { name, startTime, endTime, startDate, endDate, userId } = req.body;

  try {
    // supabase insert query
    const { data, error } = await supabase
      .from("meetings")
      .insert([
        {
          name,
          start_time: startTime,
          end_time: endTime,
          start_date: startDate,
          end_date: endDate,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Error inserting meeting:", error);
    res.status(500).json({ error: error.message });
  }
});


const port = 5014
const host = 'localhost'
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})