import React from "react"
import { TimelineEvent } from "../types/patient"

interface Props {
  events: TimelineEvent[]
}

const NotificationPanel: React.FC<Props> = ({ events }) => {

  return (

    <div className="notification-panel">

      <h3>Recent Updates</h3>

      {events.map((event, index) => (

        <div key={index} className={`event ${event.type}`}>

          <p>{event.description}</p>

          <span>{event.timestamp}</span>

        </div>

      ))}

    </div>

  )

}

export default NotificationPanel