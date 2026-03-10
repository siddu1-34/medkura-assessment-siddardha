import React from "react"
import PatientCaseCard from "./components/PatientCaseCard"
import { patientCase } from "./data/dummyData"
import "./styles/dashboard.css"

function App() {

  return (

    <div className="app">

      <PatientCaseCard data={patientCase} />

    </div>

  )

}

export default App