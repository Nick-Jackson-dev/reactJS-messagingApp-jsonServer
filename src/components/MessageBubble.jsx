//accepts styles module from MessageContainer
import { formatDistance } from "date-fns"
import Avatar from "./Avatar"
export default function MessageBubble({ message, from, styles, prevMessage }) {
  //   If the bubbles don't have avatar use initials instead
  //   const initials = (displayName) => {
  //     let name = displayName.split(" ")
  //     let initials = ""
  //     name.forEach((word) => {
  //       let firstChar = word[0]
  //       initials += firstChar.toUpperCase()
  //     })

  //     return initials
  //   }

  // Incoming message bubble render
  if (message.incoming)
    return (
      <div>
        {(!prevMessage ||
          (prevMessage && prevMessage.incoming !== message.incoming) ||
          (prevMessage && prevMessage.senderId !== message.senderId)) && (
          <div className={`${styles["sender-incoming"]} ${styles["sender"]}`}>
            <Avatar src={`../../data/assets/${from.photoSource}`} />
          </div>
        )}

        <div className={`${styles["bubble-incoming"]} ${styles["bubble"]}`}>
          <div className={`${styles["content-incoming"]} ${styles["content"]}`}>
            <p>{message.content}</p>
            <p className={styles["sent-time"]}>
              {formatDistance(new Date(message.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    )

  //outoing message bubble render
  return (
    <div>
      {(!prevMessage ||
        (prevMessage && prevMessage.incoming !== message.incoming)) && (
        <div className={`${styles["sender-outgoing"]} ${styles["sender"]}`}>
          <Avatar src={`../../data/assets/${from.photoSource}`} />
        </div>
      )}

      <div className={`${styles["bubble-outgoing"]} ${styles["bubble"]}`}>
        <div className={`${styles["content-outgoing"]} ${styles["content"]}`}>
          <p>{message.content}</p>
          <p className={styles["sent-time"]}>
            {formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
