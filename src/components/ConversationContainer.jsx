import React, { useEffect, useRef } from "react"
import sortObjects from "../util/sortObjects"
//components
import MessageBubble from "./MessageBubble"

//styles
import styles from "./MessageContainer.module.css"

export default function ConversationContainer({
  conversation,
  currentUser,
  getUserFromId,
}) {
  const displayMessages = sortObjects(
    conversation.messages,
    "createdAt",
    false
  ).map((m) => {
    return {
      ...m,
      incoming: m.senderId !== currentUser.id,
      from: getUserFromId(m.senderId),
    }
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "instant",
      block: "center",
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  return (
    <div className={styles["message-container"]}>
      {displayMessages.map((m, i) => (
        <React.Fragment key={m.id}>
          <MessageBubble
            styles={styles}
            message={m}
            from={m.from}
            prevMessage={i === 0 ? null : displayMessages[i - 1]}
          />
        </React.Fragment>
      ))}

      <div ref={messagesEndRef} />
    </div>
  )
}
