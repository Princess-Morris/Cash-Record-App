const express = require('express')
const pool = require('./db')
const port = 5000

const app = express()
app.use(express.json())


pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Connection error", err.stack));

const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cashRecord(
            id SERIAL PRIMARY KEY,
            category VACHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            moment VARCHAR(100),
            amount NOT NULL,
            total NOT NULL
            )`)
        console.log("Table 'cashRecord' created successfully")
    } catch (error) {
        console.error("Error creating table", error)
    }
}

createTable()

app.post("/", async (req, res ) => {
  const {category, description, moment, amount, total} = req.body;

  try{
    const result = await pool.query(
        "INSERT INTO cashRecord (category, description, moment, amount, total) VALUES ($1 $2), []"
    )

  } catch(error){
     console.error(error);
     res.status(500).json({error: "Database error"})
  }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`)) 