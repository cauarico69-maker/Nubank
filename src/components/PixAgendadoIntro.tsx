import React from 'react';
import { X, Calendar, Smile, Sliders, Clock } from 'lucide-react';

interface PixAgendadoIntroProps {
  onClose: () => void;
  onStart: () => void;
}

export const PixAgendadoIntro: React.FC<PixAgendadoIntroProps> = ({ onClose, onStart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in p-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6">
          <button
            onClick={onClose}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Hero Graphic */}
        <div className="w-16 h-16 rounded-2xl bg-[#24133b] border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
          <Calendar className="w-8 h-8 stroke-[1.8]" />
        </div>

        {/* Headings */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">Pix agendado</h1>
          <p className="text-sm text-white/70 leading-snug">
            Aquele Pix que você sempre envia ficou mais fácil.
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-6">
          {/* Benefit 1 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Rápido e prático</h3>
              <p className="text-xs text-white/60 leading-relaxed mt-0.5">
                Você define quem recebe, a frequência e a gente faz sempre no dia certinho.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Controle total</h3>
              <p className="text-xs text-white/60 leading-relaxed mt-0.5">
                Você pode cancelar o Pix Agendado quando quiser no seu{' '}
                <span className="font-semibold text-white">Assistente de pagamentos</span>.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ganhe tempo</h3>
              <p className="text-xs text-white/60 leading-relaxed mt-0.5">
                Assim que a transferência for feita, a gente te avisa e disponibiliza o comprovante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Começar Button */}
      <div className="pt-6">
        <button
          onClick={onStart}
          className="w-full bg-[#820AD1] hover:bg-[#9312eb] active:scale-98 text-white font-bold text-sm py-4 rounded-full transition-all cursor-pointer shadow-lg"
        >
          Começar
        </button>
      </div>
    </div>
  );
};
