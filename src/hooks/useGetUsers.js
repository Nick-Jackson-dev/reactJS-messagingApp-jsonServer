import { useState, useEffect } from "react"
import { useFetch } from "./useFetch"

export default function useGetUsers() {
  const {
    data: users,
    error,
    isPending,
  } = useFetch("http://localhost:3000/users")

  const getUserFromId = (userId) => {
    const thisUser = users.find((user) => {
      //   console.log(user.id, userId, user.id === userId)
      //   if (user.id === userId) console.log(user)
      return user.id === userId
    })
    return thisUser
  }

  const getUserAvatarSrcfromUserId = (userId) => {
    const user = getUserFromId(userId)
    const avatarSrc = user.photoSource

    return avatarSrc
  }

  return { users, getUserFromId, getUserAvatarSrcfromUserId, error, isPending }
}
