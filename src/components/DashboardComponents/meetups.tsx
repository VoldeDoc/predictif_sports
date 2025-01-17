import React, { useEffect, useState } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";

interface Message {
  id: number;
  message: string;
  group_id: number;
  sender_id: number;
  created_at: string;
  updated_at: string;
  deleted_by: string | null;
}

const LastMessages: React.FC = () => {
  const { getLastMessagesForGroups } = useDashBoardManagement();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getLastMessagesForGroups();
        setMessages(response?.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    })();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Last Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages available.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-lg w-16 h-16 flex items-center justify-center font-bold text-lg">
                {msg.id}
              </div>
              <div className="flex-1 ml-4">
                <p className="text-gray-800 font-semibold text-lg mb-1">
                  {msg.message}
                </p>
                <p className="text-gray-600 text-sm">
                  Group ID: <span className="font-medium">{msg.group_id}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Sender ID: <span className="font-medium">{msg.sender_id}</span>
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastMessages;