const doctors = [
  {
    id: "doc_001",
    name: "Dr. Priya Nair",
    specialty: "cardiology",
    city: "hyderabad",
    consultationFee: 800,
    isVerified: true,
    averageRating: 4.7
  },
  {
    id: "doc_002",
    name: "Dr. Rahul Verma",
    specialty: "orthopedic",
    city: "hyderabad",
    consultationFee: 700,
    isVerified: true,
    averageRating: 4.5
  }
]

const slots = {
  doc_001: [
    {
      datetime: "2026-03-12T10:00:00+05:30",
      duration: 30,
      isBooked: false
    },
    {
      datetime: "2026-03-12T11:00:00+05:30",
      duration: 60,
      isBooked: true
    }
  ],

  doc_002: [
    {
      datetime: "2026-03-12T12:00:00+05:30",
      duration: 30,
      isBooked: false
    }
  ]
}

const bookings = []

module.exports = { doctors, slots, bookings }