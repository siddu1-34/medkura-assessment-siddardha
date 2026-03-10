import { PatientCase } from "../types/patient"

export const patientCase: PatientCase = {
  id: "CASE-2026",
  patientName: "Ravi Sharma",
  age: 62,
  condition: "Knee Replacement",
  currentStage: 3,
  urgency: "attention",

  representative: {
    name: "Anjali Gupta",
    phone: "+91 9876543210"
  },

  nextAction: "Upload latest MRI report",

  events: [
    {
      timestamp: "1 Mar 10:30 AM",
      description: "Lab report uploaded",
      type: "success"
    },
    {
      timestamp: "1 Mar 12:00 PM",
      description: "Insurance pre-auth submitted",
      type: "info"
    },
    {
      timestamp: "2 Mar 9:00 AM",
      description: "Dr. Mehta confirmed availability",
      type: "success"
    },
    {
      timestamp: "2 Mar 2:30 PM",
      description: "MRI report missing",
      type: "alert"
    }
  ]
}