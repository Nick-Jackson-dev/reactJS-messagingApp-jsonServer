import Avatar from "./Avatar"

export default function MessageList({
  setActiveConversationId,
  userConversations,
  getFullAvatarSrc,
}) {
  return (
    <div className="message-list-container">
      {userConversations.length !== 0 &&
        userConversations.map((conversation) => (
          <div
            className="message-list-item"
            key={conversation.id}
            onClick={() => setActiveConversationId(conversation.id)}
          >
            <Avatar src={getFullAvatarSrc(conversation)} />
            {conversation.recipientIds.length > 2 && (
              <div className="avatar-mark">
                +{conversation.recipientIds.length - 2}
              </div>
            )}
            {conversation.messages.length !== 0 && (
              <div className="message-preview">
                {
                  conversation.messages[conversation.messages.length - 1]
                    .content
                }
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
