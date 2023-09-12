import { useState, useEffect } from "react"
import "./App.css"
import "./active-message-area.css"
import useGetConversations from "./hooks/useGetConversations"
import useGetUsers from "./hooks/useGetUsers"
import useMessaging from "./hooks/useMessaging"

import { getLastSenderIdThatIsNotCurrentUser } from "./util/getDataFromMessages"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"
import ConversationContainer from "./components/ConversationContainer"
import ParticipantList from "./components/ParticipantList"
import NewConversation from "./components/NewConversation"
import { arrayEquals } from "./util/arrayEquals"

const INITIAL_FORM_DATA = {
  content: "",
}

function App() {
  const [userId, setUserId] = useState(2)
  const [currentUser, setCurrentuser] = useState(null)

  const [activeConversationId, setActiveConversationId] = useState(null)
  const [activeConversation, setActiveConversation] = useState(null)

  const {
    users,
    error: fetchUserError,
    isPending: fetchUserPending,
    getUserFromId,
    getUserAvatarSrcfromUserId,
  } = useGetUsers()

  const {
    userConversations,
    getConversationFromId,
    getUserConversations,
    error: fetchConversationsError,
    isPending: fetchConversationsPending,
  } = useGetConversations()

  const { sendMessage, data: messageData } = useMessaging(
    activeConversation === null
      ? null
      : `http://localhost:3000/conversations/${activeConversation.id}/messages`
  )
  const { sendMessage: startConversation, data: conversationData } =
    useMessaging("http://localhost:3000/conversations")

  const [messageFormData, setMessageFormData] = useState(INITIAL_FORM_DATA)
  function updateFields(fields) {
    setMessageFormData((prev) => {
      return { ...prev, ...fields }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!messageFormData.content) return console.log("no content")
    console.log({
      senderId: currentUser.id,
      content: messageFormData.content,
      createdAt: new Date(),
    })

    await sendMessage({
      senderId: currentUser.id,
      content: messageFormData.content,
      createdAt: new Date(),
    })

    updateFields(INITIAL_FORM_DATA)
  }

  const [newParticipantIds, setNewParticipantIds] = useState([])
  const updateNewParticipantIds = (participantId) => {
    if (newParticipantIds.includes(participantId)) {
      return setNewParticipantIds((prev) =>
        prev.filter((id) => id !== participantId)
      )
    }
    return setNewParticipantIds((prevPartcipantIds) => {
      return [...prevPartcipantIds, participantId]
    })
  }

  const startNewConversation = () => {
    if (newParticipantIds.length === 0) return

    //check if userConversations match the recipients entered, if so, make that the activeConversation.
    let existingConversation = null
    userConversations.forEach((conversation) => {
      if (
        arrayEquals(
          [...newParticipantIds, currentUser.id].sort(),
          conversation.recipientIds.sort()
        )
      ) {
        existingConversation = conversation
      }
    })
    if (existingConversation)
      return setActiveConversationId(existingConversation.id)

    startConversation({
      recipientIds: [...newParticipantIds, currentUser.id].sort(),
    })
  }

  useEffect(() => {
    if (!activeConversationId) {
      return setActiveConversation(null)
    }
    setActiveConversation(getConversationFromId(activeConversationId))
    setNewParticipantIds([])
  }, [activeConversationId])

  useEffect(() => {
    if (users && users.length) {
      const user = getUserFromId(userId)
      console.log(user)
      setCurrentuser(user)
      getUserConversations(userId)
    }
  }, [users, userId])

  //   console.log(users)
  //   console.log(userMessages)
  //   console.log(activeMessageId, activeMessage)

  const getFullAvatarSrc = (conversation) => {
    const prefix = "../data/assets/"
    const source = getUserAvatarSrcfromUserId(
      getLastSenderIdThatIsNotCurrentUser({
        currentUserId: currentUser.id,
        conversation,
      })
    )
    return prefix + source
  }

  if (!currentUser) return <p>...loading</p>

  return (
    <>
      <main>
        <div className="page-container">
          <div className="message-bar">
            <button
              className="new-message-button"
              onClick={() => setActiveConversationId(null)}
            >
              New Message
            </button>
            <MessageList
              setActiveConversationId={setActiveConversationId}
              userConversations={userConversations}
              getFullAvatarSrc={getFullAvatarSrc}
            />

            {/* Sign in as other user section (for testing) */}
          </div>
          {/* message */}
          {activeConversation !== null && (
            <div className="active-message-area">
              <ParticipantList
                conversation={activeConversation}
                getUserFromId={getUserFromId}
              />
              <div className="content">
                <ConversationContainer
                  conversation={activeConversation}
                  currentUser={currentUser}
                  getUserFromId={getUserFromId}
                />
              </div>
              <form
                className="form message-form"
                id="message-form"
                onSubmit={(e) => handleSubmit(e)}
              >
                <MessageForm
                  {...messageFormData}
                  updateFields={updateFields}
                ></MessageForm>
              </form>
            </div>
          )}
          {/* Starting new conversation */}
          {activeConversation === null && (
            <div className="active-message-area">
              <NewConversation
                potentialParticipants={users.filter(
                  ({ id }) => id !== currentUser.id
                )}
                newParticipantIds={newParticipantIds}
                updateNewParticipantIds={updateNewParticipantIds}
              />
              <div className="new-conversation-button">
                <button onClick={startNewConversation}>Start Message</button>
              </div>
              {newParticipantIds.length === 1 && (
                <div className="new-conversation-button">
                  <button
                    onClick={() => {
                      setUserId(newParticipantIds[0])
                      setNewParticipantIds([])
                    }}
                  >
                    Switch to this user
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
