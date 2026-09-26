import React, { useState } from 'react';
import { ChevronLeft, Bell, Search, ChevronRight, MessageSquare, ChevronDown } from 'lucide-react';
import { HELP_CATEGORIES } from '../data/mockData';

interface HelpScreenProps {
  userName: string;
  onBack: () => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ userName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: `Olá, ${userName}! Sou o assistente virtual do Nubank. Como posso ajudar você agora?` },
  ]);
  const [chatInput, setChatInput] = useState('');

  const filteredCategories = HELP_CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Entendi perfeitamente sua dúvida sobre "${userText}". Seus dados e transações Pix estão seguros. Posso ajudar em algo mais?`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-white/5">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-base font-semibold">Ajuda</h2>
          <button
            onClick={() => alert('Notificações de atendimento')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5 text-white/80" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-bold tracking-tight leading-snug">
            Como podemos te <span className="text-[#820AD1]">ajudar</span> hoje, {userName}?
          </h1>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Qual é sua dúvida?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#16161a] border border-purple-500/30 focus:border-[#820AD1] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
            />
            <Search className="w-5 h-5 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Categorias */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-semibold text-white/60 tracking-wider">
              Principais dúvidas sobre
            </h3>

            <div className="divide-y divide-white/5">
              {filteredCategories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => alert(`Artigos de ajuda sobre: ${item.title}`)}
                  className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
                >
                  <div className="pr-4">
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-white/50 mt-0.5">{item.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Todas as 24 categorias exibidas')}
              className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 py-2 cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Expandir categorias</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Contact Button */}
      <div className="p-6 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={() => setShowSupportChat(true)}
          className="w-full bg-[#1b1b20] hover:bg-[#25252c] active:scale-98 border border-white/10 rounded-full py-3.5 px-6 flex items-center justify-center gap-3 text-sm font-semibold text-white transition-all cursor-pointer shadow-lg"
        >
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span>Entrar em contato</span>
        </button>
      </div>

      {/* Real-time Support Chat Modal */}
      {showSupportChat && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex flex-col justify-between animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#16161b]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#820AD1] flex items-center justify-center font-bold text-white text-xs">
                Nu
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Suporte Nubank</h3>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Atendimento online
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowSupportChat(false)}
              className="text-white/60 hover:text-white px-3 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#820AD1] text-white rounded-br-none'
                      : 'bg-[#1c1c22] text-white/90 border border-white/10 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-[#141418] border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#202026] rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#820AD1]"
            />
            <button
              type="submit"
              className="bg-[#820AD1] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#9312eb] transition-colors cursor-pointer"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
