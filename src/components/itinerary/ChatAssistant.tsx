import React, { useState } from "react";
import axios from "axios";

const ChatAssistant: React.FC<{ itinerary: string }> = ({ itinerary }) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: input, bot: "" }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        itinerary,
        message: input,
      });
      setMessages(
        newMessages.map((msg, index) =>
          index === newMessages.length - 1 ? { ...msg, bot: response.data.response } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching response", error);
      setMessages(newMessages.map((msg, index) => (index === newMessages.length - 1 ? { ...msg, bot: "Error fetching response." } : msg)));
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h3>Chat with your Assistant</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p><strong>You:</strong> {msg.user}</p>
            <p><strong>AI:</strong> {msg.bot || "Typing..."}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about your trip..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
