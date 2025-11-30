import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, MessageRole } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: MessageRole.MODEL,
      text: 'مرحباً! أنا مساعدك الذكي في عالم النباتات. هل لديك أي سؤال عن البناء الضوئي؟',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        // Convert chat history for API
        const apiHistory = messages.map(m => ({
            role: m.role === MessageRole.USER ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const responseText = await sendMessageToGemini(userMessage.text, apiHistory);
        
        const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: MessageRole.MODEL,
            text: responseText,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
        console.error("Chat error", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div id="chat-bot" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-leaf-100 flex flex-col h-[600px] w-full max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-leaf-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
             <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">المساعد الذكي</h3>
            <p className="text-leaf-100 text-xs flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              مدعوم بواسطة Gemini
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === MessageRole.USER ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === MessageRole.USER
                  ? 'bg-blue-500 text-white'
                  : 'bg-leaf-500 text-white'
              }`}
            >
              {msg.role === MessageRole.USER ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === MessageRole.USER
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-leaf-500 text-white flex items-center justify-center">
                <Bot size={16} />
             </div>
             <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                <Loader2 className="h-5 w-5 animate-spin text-leaf-500" />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل سؤالاً عن النباتات..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-leaf-600 text-white p-3 rounded-xl hover:bg-leaf-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};