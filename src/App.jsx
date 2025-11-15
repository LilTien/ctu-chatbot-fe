import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "./components/ChatMessage";

const questions = [
    "Anda boleh bertanyakan soalan seperti dibawah.",
    "Apa itu epistemology Islam ?",
    "Huraikan isu keruntuhan akhlak golongan berilmu.",
    "Apakah punca berlaku keruntuhan akhlak golongan berilmu apabila tidak menghayati epistemology Islam?",
    "Bagaimana memahami epistemologi Islam dapat membantu diri untuk terus bersikap tawaduk ?",
    "Apakah kepentingan pengajaran epistemology Islam ini kepada generasi muda?",
]

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // useEffect(() => {
  //   const initialBotMessages = questions.map((q, index) => ({
  //     sender: "bot",
  //     message: `${index !== 0 ? `${index}. `  : ''} ${q}`
  //   }));
  //   setMessages(initialBotMessages);
  // }, []);

  // 👇 Auto scroll when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { question: input });
      console.log("res: " , res);
      const botMsg = { sender: "bot", message: res.data.response.text };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg = { sender: "bot", message: "Maaf, server tidak dapat dihubungi." };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const onClickSetQuestion = () => {
    const initialBotMessages = questions.map((q, index) => ({
      sender: "bot",
      message: `${index !== 0 ? `${index}. `  : ''} ${q}`
    }));
    setMessages(initialBotMessages);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-950">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-lg flex flex-col h-[80vh]">
        <div className="flex items-center justify-center py-4 border-b rounded-tl-2xl rounded-tr-2xl border-gray-700 bg-[linear-gradient(90deg,rgba(155,42,138,1)_0%,rgba(178,87,199,1)_50%,rgba(83,83,237,1)_100%)]">
          <h1 className="text-lg font-semibold text-white">Jurang Ilmu Chatbot</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} sender={msg.sender} message={msg.message} />
          ))}
          {loading && (
            <div className="text-gray-400 italic mt-2 animate-pulse">
              Chatbot sedang menaip...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <div className="flex flex-col">
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-700 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 focus:outline-none"
              placeholder="Tanya sesuatu..."
            />
            <button
              type="submit"
              className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition"
            >
              Hantar
            </button>
          </form>
          <div className=" flex justify-center px-4 mb-[15px]">
            <div 
              className="bg-gray-800 w-full flex justify-center items-center rounded-xl h-[50px] cursor-pointer"
              onClick={() => {onClickSetQuestion()}}>
              <h2>Or Select a Question</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
