const express = require("express");
const cors = require("cors");

const summariseRoute = require("./routes/summariseRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", summariseRoute);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`AI server running on port ${PORT}`);
});