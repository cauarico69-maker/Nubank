import React, { useState } from 'react';
import { ChevronLeft, HelpCircle, Clipboard } from 'lucide-react';

interface PixCopiaColaScreenProps {
  onBack: () => void;
  onProceed: (code: string) => void;
}

export const PixCopiaColaScreen: React.FC<PixCopiaColaScreenProps> = ({ onBack, onProceed }) => {
  const [code, setCode] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setCode(text);
    } catch {
      setCode('00020126580014br.gov.bcb.pix0136renata@nubank.com520400005303986540510.005802BR');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in p-6">
      <div>
        {/* Header */}
        <div className="flex items-center pb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="space-y-4 pt-1">
          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
            Insira o código do Pix Copia e Cola
          </h1>

          <div className="relative pt-2">
            <textarea
              rows={4}
              placeholder="Cole o código aqui"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#121216] border border-white/10 focus:border-[#820AD1] rounded-2xl p-4 text-xs text-white placeholder-white/40 focus:outline-none resize-none transition-colors"
            />
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Colar código</span>
              </button>
              <button
                onClick={() => alert('O código Pix Copia e Cola é uma sequência de caracteres gerada por quem vai receber.')}
                className="text-white/40 hover:text-white"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() => onProceed(code)}
          disabled={!code.trim()}
          className="w-full bg-[#820AD1] disabled:opacity-40 hover:bg-[#9312eb] active:scale-98 text-white font-bold text-sm py-4 rounded-full transition-all cursor-pointer shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
