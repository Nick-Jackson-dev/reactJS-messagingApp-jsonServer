import { useFetch } from "./useFetch"

export default function useMessaging(url) {
  const { isPending, error, postData, patchData, data } = useFetch(url, "POST")

  const sendMessage = async (messageObject) => {
    postData(messageObject)
  }
  return { sendMessage, data, isPending, error }
}
