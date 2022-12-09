import express from "express";
import dotenv from "dotenv";



dotenv.config();
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Express')
})

// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`)
})