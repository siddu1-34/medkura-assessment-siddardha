import React from "react"

const stages = [
  "Onboarded",
  "Lab Tests",
  "Second Opinion",
  "Hospital Selected",
  "Surgery Scheduled",
  "Completed"
]

interface Props {
  currentStage: number
}

const StageProgress: React.FC<Props> = ({ currentStage }) => {

  return (

    <div className="progress-container">

      {stages.map((stage, index) => {

        const stageNumber = index + 1
        const active = stageNumber <= currentStage

        return (

          <div key={stage} className="stage">

            <div className={`circle ${active ? "active" : ""}`}>
              {stageNumber}
            </div>

            <span>{stage}</span>

          </div>

        )

      })}

    </div>

  )

}

export default StageProgress