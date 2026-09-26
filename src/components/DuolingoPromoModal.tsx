import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import duolingoBannerImg from '../assets/images/duolingo_nubank_banner_1790001933459.jpg';
import { NuLogo } from './NuLogo';

interface DuolingoPromoModalProps {
  onClose: () => void;
}

export const DuolingoPromoModal: React.FC<DuolingoPromoModalProps> = ({ onClose }) => {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    setIsActivated(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in">
      {/* Top Media & Close Button */}
      <div className="relative w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 active:scale-95 flex items-center justify-center transition-all cursor-pointer text-white"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Hero Image */}
        <div className="w-full h-52 overflow-hidden bg-[#240638]">
          <img
            src={duolingoBannerImg}
            alt="Duolingo e Nubank juntos"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Green Duolingo & Nu Brand Stripe */}
        <div className="w-full bg-[#58cc02] py-2.5 px-6 flex items-center justify-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#820AD1] flex items-center justify-center shadow-sm">
            <span className="text-[11px] font-black text-white leading-none">nu</span>
          </div>
          <span className="text-[18px] font-black tracking-tight text-white font-sans">
            duolingo
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pt-6 pb-6 space-y-5">
        <h2 className="text-[22px] font-bold text-white leading-tight">
          Aproveite 3 meses de Duolingo sem anúncios
        </h2>

        <p className="text-[15px] text-white/80 leading-relaxed">
          O Duolingo é a maior plataforma de ensino do mundo. São 40 idiomas, matemática e
          xadrez — e com Nubank você tem 3 meses sem anúncios.
        </p>

        <p className="text-[15px] text-white/80 leading-relaxed font-normal">
          Faça quantas lições quiser por dia, com <span className="font-semibold text-white">Energia ilimitada</span>.
        </p>

        {isActivated && (
          <div className="bg-[#181820] border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-[13px] text-emerald-300 font-semibold">
              Super Duolingo resgatado com sucesso! Verifique seu e-mail cadastrado.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action */}
      <div className="px-6 pb-8 pt-2 space-y-3 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={handleActivate}
          disabled={isActivated}
          className="w-full bg-[#820AD1] hover:bg-[#9214e6] active:scale-[0.99] text-white font-bold text-[15px] py-4 rounded-full transition-all cursor-pointer shadow-lg disabled:opacity-70 text-center"
        >
          {isActivated ? 'Benefício resgatado!' : 'De graça? Eu quero'}
        </button>

        <p className="text-center text-[12px] text-white/50 px-4 leading-relaxed">
          Após os 3 meses, aproveite Super Duolingo com um Plano Individual ou Plano Família.
        </p>
      </div>
    </div>
  );
};
