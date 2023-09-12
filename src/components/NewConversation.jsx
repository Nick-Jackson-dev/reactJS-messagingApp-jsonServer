import Avatar from "./Avatar"

export default function NewConversation({
  potentialParticipants,
  newParticipantIds,
  updateNewParticipantIds,
}) {
  return (
    <>
      <h2 className="section-title">Start a new Conversation</h2>
      <h3>Select Partcipants:</h3>

      <div className="potential-participants-list grid-list">
        {potentialParticipants.map((p) => (
          <div
            key={p.id}
            className={
              newParticipantIds.includes(p.id)
                ? "participant-list-item included"
                : "participant-list-item"
            }
            onClick={() => updateNewParticipantIds(p.id)}
          >
            <Avatar src={`../../data/assets/${p.photoSource}`} />
            <div className="display-name">{p.displayName}</div>
          </div>
        ))}
      </div>
    </>
  )
}
