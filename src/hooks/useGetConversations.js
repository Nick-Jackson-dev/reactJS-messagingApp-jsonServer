import { useState } from "react"
import { useFetch } from "./useFetch"

export default function useGetConversations() {
  const [userConversations, setUserConversations] = useState([])
  const {
    data: conversations,
    error,
    isPending,
  } = useFetch("http://localhost:3000/conversations?_embed=messages")

  const getUserConversations = (userId) => {
    if (!userId || !conversations || conversations.length === 0) return

    const filteredConversations = conversations.filter((conversation) => {
      return conversation.recipientIds.includes(userId)
    })
    setUserConversations(filteredConversations)
  }

  const getConversationFromId = (conversationId) => {
    if (!conversationId) return null
    return conversations.find(({ id }) => id === conversationId)
  }

  return {
    userConversations,
    getUserConversations,
    getConversationFromId,
    error,
    isPending,
  }
}
