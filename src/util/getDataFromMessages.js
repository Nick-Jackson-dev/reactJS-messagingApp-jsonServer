function getLastSenderIdThatIsNotCurrentUser({ currentUserId, conversation }) {
  //if there is only one other recipient, return that recipientId
  if (conversation.recipientIds.length === 2) {
    return conversation.recipientIds.find((id) => id !== currentUserId)
  }

  //otherwise, go through messages
  const nonUserMessages = conversation.messages.filter(
    ({ senderId }) => senderId !== currentUserId
  )

  //if no other messages besides from current user, return first recipientId that isn't the currentuserId
  if (nonUserMessages.length === 0) {
    return conversation.recipientIds.find((id) => id !== currentUserId)
  }

  return nonUserMessages[nonUserMessages.length - 1]["senderId"]
}

export { getLastSenderIdThatIsNotCurrentUser }
