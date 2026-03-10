import React, { useState } from "react"
import { PatientCase } from "../types/patient"
import StageProgress from "./StageProgress"
import NotificationPanel from "./NotificationPanel"

interface Props {
  data: PatientCase
}

const PatientCaseCard: React.FC<Props> = ({ data }) => {

  const [urgency, setUrgency] = useState(data.urgency)

  const toggleUrgency = () => {

    if (urgency === "normal") setUrgency("attention")
    else if (urgency === "attention") setUrgency("urgent")
    else setUrgency("normal")

  }

  return (

    <div className="dashboard">

      <div className="card">

        <div className="card-header">

          <div>

            <h2>{data.patientName}</h2>
            <p>Case ID: {data.id}</p>

          </div>

          <span className={`badge ${urgency}`}>
            {urgency}
          </span>

        </div>

        <p className="condition">{data.condition}</p>

        <StageProgress currentStage={data.currentStage} />

        <div className="info">

          <p>
            <strong>Representative:</strong> {data.representative.name}
          </p>

          <p>
            <strong>Next Action:</strong> {data.nextAction}
          </p>

        </div>

        <button onClick={toggleUrgency}>
          Toggle Urgency
        </button>

      </div>

      <NotificationPanel events={data.events} />

    </div>

  )

}

export default PatientCaseCard