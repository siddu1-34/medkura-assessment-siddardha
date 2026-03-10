const Joi = require("joi")

const bookingSchema = Joi.object({
  doctorId: Joi.string().required(),
  slotDatetime: Joi.string().required(),
  patientName: Joi.string().required(),
  patientPhone: Joi.string().required()
})

module.exports = bookingSchema