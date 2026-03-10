const { doctors, slots, bookings } = require("../data/store")
const { v4: uuidv4 } = require("uuid")
const bookingSchema = require("../validations/bookingValidation")

exports.getDoctors = (req, res) => {

  const { specialty, city } = req.query

  let result = doctors

  if (specialty)
    result = result.filter(d => d.specialty === specialty)

  if (city)
    result = result.filter(d => d.city === city)

  res.json(result)
}


exports.getDoctorSlots = (req, res) => {

  const doctorId = req.params.id

  if (!slots[doctorId])
    return res.status(404).json({ error: "Doctor not found" })

  const doctor = doctors.find(d => d.id === doctorId)

  res.json({
    doctorId,
    doctorName: doctor.name,
    slots: slots[doctorId]
  })
}


exports.bookSlot = (req, res) => {

  const { error } = bookingSchema.validate(req.body)

  if (error)
    return res.status(400).json({ error: error.message })

  const { doctorId, slotDatetime, patientName, patientPhone } = req.body

  const doctorSlots = slots[doctorId]

  if (!doctorSlots)
    return res.status(404).json({ error: "Doctor not found" })

  const slot = doctorSlots.find(s => s.datetime === slotDatetime)

  if (!slot)
    return res.status(404).json({ error: "Slot not found" })

  if (slot.isBooked)
    return res.status(409).json({ error: "Slot already booked" })

  slot.isBooked = true

  const booking = {
    bookingRef: uuidv4(),
    doctorId,
    slotDatetime,
    patientName,
    patientPhone
  }

  bookings.push(booking)

  res.json(booking)
}