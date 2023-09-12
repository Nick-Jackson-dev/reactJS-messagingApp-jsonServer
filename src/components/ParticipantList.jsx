import React from "react"
import Avatar from "./Avatar"

export default function ParticipantList({ conversation, getUserFromId }) {
  return (
    <>
      <h2 className="section-title">Participants:</h2>
      <div className="message-participants">
        {conversation.recipientIds.map((recipientId) => (
          <div key={recipientId} className="participant-list-item">
            <Avatar
              src={`../../data/assets/${
                getUserFromId(recipientId).photoSource
              }`}
            />
            <div className="display-name">
              {getUserFromId(recipientId).displayName}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
