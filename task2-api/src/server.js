const express = require("express")
const cors = require("cors")

const doctorsRoutes = require("./routes/doctorsRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", doctorsRoutes)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})