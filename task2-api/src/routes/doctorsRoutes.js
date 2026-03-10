const express = require("express")
const router = express.Router()

const {
  getDoctors,
  getDoctorSlots,
  bookSlot
} = require("../controllers/doctorsController")

router.get("/doctors", getDoctors)

router.get("/doctors/:id/slots", getDoctorSlots)

router.post("/bookings", bookSlot)

module.exports = router