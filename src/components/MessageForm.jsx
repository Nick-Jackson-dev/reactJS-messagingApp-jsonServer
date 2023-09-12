import sendMessageIcon from "../../data/send-message-icon.svg"

export default function MessageForm({ content, updateFields }) {
  return (
    <div className="d-md-flex text-wrap">
      <label style={{ width: "100%" }} className="me-4">
        <textarea
          onChange={(e) => updateFields({ content: e.target.value })}
          value={content}
          className="form-control message-form-text-area"
          max-length={500}
          wrap="hard"
          placeholder="Message..."
        />
      </label>
      <button
        type="submit"
        //   disabled={sendPending}
        className="message-form-button"
      >
        <img src={sendMessageIcon} alt="send message icon" className="icon" />
      </button>
    </div>
  )
}
