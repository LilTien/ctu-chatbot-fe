import React from "react";
import { motion } from "framer-motion";
import TypingEffect from "./TypingEffect";

export default function ChatMessage({ message, sender }) {
  const isUser = sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl shadow 
        ${isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-800 rounded-bl-none"}`}
      >
        {isUser ? message : message }
      </div>
    </motion.div>
  );
}
