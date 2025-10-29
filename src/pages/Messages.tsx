import React, { useState } from "react";

type Role = "super-admin" | "admin" | "architect" | "structural-team" | "customer";

interface Message {
  sender: string;
  time: string;
  text: string;
}

const Messages: React.FC<{ role: Role }> = ({ role }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "Sender 1", time: "2 hours ago", text: "Message preview 1" },
    { sender: "Sender 2", time: "1 hour ago", text: "Message preview 2" },
    { sender: "Sender 3", time: "30 mins ago", text: "Message preview 3" },
  ]);

  const canEdit = ["super-admin", "admin", "architect"].includes(role);

  const handleChange = (index: number, key: keyof Message, value: string) => {
    const updated = [...messages];
    updated[index][key] = value;
    setMessages(updated);
  };

  const handleAddMessage = () => {
    setMessages([
      ...messages,
      { sender: "New Sender", time: "Just now", text: "New message..." },
    ]);
  };

  const handleDeleteMessage = (index: number) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {canEdit && (
        <button
          onClick={handleAddMessage}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Message
        </button>
      )}

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:shadow-md transition flex justify-between"
          >
            <div className="flex-1">
              {canEdit ? (
                <>
                  <input
                    className="font-semibold w-full border-b mb-1"
                    value={msg.sender}
                    onChange={(e) => handleChange(index, "sender", e.target.value)}
                  />
                  <input
                    className="text-sm text-gray-500 w-full border-b mb-1"
                    value={msg.time}
                    onChange={(e) => handleChange(index, "time", e.target.value)}
                  />
                  <textarea
                    className="w-full text-gray-600 p-1 border rounded"
                    value={msg.text}
                    onChange={(e) => handleChange(index, "text", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p className="font-semibold">{msg.sender}</p>
                  <p className="text-sm text-gray-500">{msg.time}</p>
                  <p className="mt-1 text-gray-600">{msg.text}</p>
                </>
              )}
            </div>

            {canEdit && (
              <button
                onClick={() => handleDeleteMessage(index)}
                className="ml-4 text-red-500 hover:text-red-700 font-bold"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
