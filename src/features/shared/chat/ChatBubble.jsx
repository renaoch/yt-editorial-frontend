import React, { useState, useEffect, useRef, useCallback } from "react";
import useCreatorStore from "../../../store/useAssignedCreatorsStore";
import useEditorStore from "../../../store/useEditorsStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { getMessages, sendMessage } from "../../../lib/api/Message";
import { supabase } from "../../../lib/supabaseClient";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const ChatApp = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(false);
  const messageEndRef = useRef(null);

  const { assignedCreators, fetchAssignedCreators } = useCreatorStore();
  const { assignedEditors, fetchAssignedEditors } = useEditorStore();
  const { user } = useAuthStore(); // contains { userId, userName, userRole }

  const users = user.userRole === "editor" ? assignedCreators : assignedEditors;

  useEffect(() => {
    if (user.userRole === "editor") {
      fetchAssignedCreators();
    } else {
      fetchAssignedEditors();
    }
  }, [user.userRole, fetchAssignedCreators, fetchAssignedEditors]);

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeUser?._id) return;
      try {
        const res = await getMessages(activeUser._id);
        setMessages(res);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, [activeUser, scrollToBottom]);

  useEffect(() => {
    if (!activeUser?._id) return;

    const channel = supabase
      .channel(`messages-${activeUser._id}-${user.userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new;
          if (newMessage.receiver_id === user.userId) {
            setMessages((prev) => [...prev, newMessage]);
            scrollToBottom();
            toast.success(`New message from ${newMessage.sender_name}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeUser, user.userId, scrollToBottom]);

  useEffect(() => {
    if (!activeUser?._id) return;

    const channel = supabase
      .channel(`status-${activeUser._id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${activeUser._id}`,
        },
        (payload) => {
          const { is_online } = payload.new;
          setOnlineStatus(is_online);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeUser]);

  useEffect(() => {
    if (!activeUser) return;

    const markOnline = async () => {
      try {
        await supabase
          .from("users")
          .update({ is_online: true })
          .eq("_id", activeUser._id);
      } catch (err) {
        console.error("Error marking online:", err);
      }
    };

    const markOffline = async () => {
      try {
        await supabase
          .from("users")
          .update({ is_online: false })
          .eq("_id", activeUser._id);
      } catch (err) {
        console.error("Error marking offline:", err);
      }
    };

    markOnline();

    return () => {
      markOffline();
    };
  }, [activeUser]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeUser?._id) return;
    console.log(
      "message",
      user.userId,
      user.userName,
      activeUser._id,
      inputText
    );
    try {
      const newMessage = {
        sender_id: user.userId,
        sender_name: user.userName,
        receiver_id: activeUser._id,
        message: inputText,
        timestamp: new Date().toISOString(),
      };
      await sendMessage(activeUser._id, inputText);

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      scrollToBottom();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="h-screen w-full relative bg-gradient-to-br from-base-100 to-base-200 flex flex-col">
      {/* Floating User Dock */}
      <motion.div
        className="fixed top-16 right-8 z-50 cursor-grab active:cursor-grabbing"
        drag
        dragMomentum={false}
        style={{ backgroundColor: "transparent" }}
      >
        <div className="bg-base-300/30 rounded-lg p-4 flex flex-col items-start gap-2 shadow-xl">
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => setActiveUser(u)}
              className="relative group flex items-center cursor-pointer p-2 rounded-md hover:bg-base-200 transition"
            >
              {/* Username on hover (left of avatar) */}
              <div className="absolute left-[-100px] opacity-0 group-hover:opacity-100 transition-opacity bg-base-100 border px-2 py-1 rounded shadow text-sm font-medium text-base-800 whitespace-nowrap">
                {u.name}
              </div>

              {/* Avatar */}
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={u.avatar} />
                <AvatarFallback>{u.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chat UI */}
      <AnimatePresence>
        {activeUser && (
          <motion.section
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="flex flex-col w-full h-full"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-base-100/70 backdrop-blur-md shadow-sm">
              <Avatar className="h-12 w-12">
                <AvatarImage src={activeUser.avatar} />
                <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{activeUser.name}</div>
                <div
                  className={`text-xs ${
                    onlineStatus ? "text-success" : "text-error"
                  }`}
                >
                  ● {onlineStatus ? "Online" : "Offline"}
                </div>
              </div>
              <button
                className="ml-auto text-sm px-3 py-1 rounded-full bg-base-200 hover:bg-error text-error"
                onClick={() => setActiveUser(null)}
              >
                Close
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 px-6 py-4 overflow-y-auto space-y-3">
              {messages.map((msg) => {
                const isMe = msg.sender_id === user.userId;
                return (
                  <div
                    key={msg.id || msg.timestamp}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-sm px-4 py-2 rounded-2xl text-sm shadow ${
                        isMe
                          ? "bg-secondary backdrop-blur-md"
                          : "bg-base-400 text-base-800"
                      }`}
                    >
                      <div className="font-medium">
                        {isMe ? "You" : msg.sender_name}
                      </div>
                      <div>{msg.message}</div>
                      {console.log(msg.created_at)}
                      <div className="text-[10px] text-right mt-1 opacity-70">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            {/* Input */}
            <div className="sticky bottom-0 bg-base-100 p-4 border-t flex gap-2 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full border border-base-300 focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 rounded-full bg-primary hover:bg-primary-focus text-white"
              >
                Send
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatApp;
