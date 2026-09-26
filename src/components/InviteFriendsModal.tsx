import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Globe, Users, UserPlus, Copy, Check } from 'lucide-react';
import { NuLogo } from './NuLogo';

interface InviteFriendsModalProps {
  onBack: () => void;
}

export const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleShare = (category: string) => {
    setSelectedCategory(category);
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-6 select-none animate-fade-in overflow-y-auto">
      <div className="space-y-6">
        {/* Header with Back Arrow */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-[22px] font-bold text-white leading-tight">
          Compartilhe coisas boas: convide amigos e familiares para o Nubank
        </h2>

        {/* Illustration Card (Matching Video 00:23) */}
        <div className="w-full rounded-3xl bg-[#141418] border border-white/5 p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
          <div className="relative w-32 h-28 flex items-center justify-center">
            {/* Person avatar silhouette */}
            <div className="w-16 h-16 rounded-full bg-[#24242c] flex items-center justify-center -ml-6 shadow-md border border-white/10">
              <span className="text-2xl">🙋‍♀️</span>
            </div>
            {/* Purple Nubank card tilted */}
            <div className="w-20 h-13 rounded-xl bg-gradient-to-tr from-[#61099e] to-[#820AD1] rotate-12 -ml-2 shadow-xl border border-white/20 flex items-center justify-center">
              <NuLogo className="w-6 h-3 text-white" color="#FFFFFF" />
            </div>
          </div>

          <p className="text-[13px] text-white/70 leading-relaxed max-w-[280px]">
            Compartilhe o convite e aumente a chance deles receberem um cartão de crédito sem taxas,
            com os benefícios do Nubank.
          </p>
        </div>

        {/* Feedback Toast */}
        {copied && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-300 font-semibold animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Link de convite para {selectedCategory} copiado com sucesso!</span>
          </div>
        )}

        {/* Options List (Matching Video 00:24) */}
        <div className="space-y-2 pt-2">
          {/* Option 1: Amigos no exterior */}
          <div
            onClick={() => handleShare('Amigos no exterior')}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#121216] hover:bg-[#1a1a20] active:scale-[0.99] border border-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <Globe className="w-5 h-5 text-white/80" />
              <span className="text-[14px] font-medium text-white">Amigos no exterior</span>
              <span className="text-[10px] font-bold text-white bg-[#820AD1] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Novo
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Option 2: Amigos no Brasil */}
          <div
            onClick={() => handleShare('Amigos no Brasil')}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#121216] hover:bg-[#1a1a20] active:scale-[0.99] border border-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <Users className="w-5 h-5 text-white/80" />
              <span className="text-[14px] font-medium text-white">Amigos no Brasil</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Option 3: Filhos menores de 18 anos */}
          <div
            onClick={() => handleShare('Filhos menores de 18 anos')}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#121216] hover:bg-[#1a1a20] active:scale-[0.99] border border-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <UserPlus className="w-5 h-5 text-white/80" />
              <span className="text-[14px] font-medium text-white">Filhos menores de 18 anos</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Copy Link Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => handleShare('amigos')}
          className="w-full bg-[#1c1c22] hover:bg-[#25252e] active:scale-[0.99] text-white font-semibold text-[14px] py-3.5 rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/10"
        >
          <Copy className="w-4 h-4 text-purple-400" />
          <span>Copiar meu link de convite</span>
        </button>
      </div>
    </div>
  );
};
