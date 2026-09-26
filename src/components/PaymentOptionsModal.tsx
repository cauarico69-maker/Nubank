import React from 'react';
import { X, RotateCcw, RefreshCw, ChevronRight } from 'lucide-react';
import { PixIcon, BarcodeIcon } from './NuLogo';

interface PaymentOptionsModalProps {
  onClose: () => void;
  onSelectBoleto: () => void;
  onSelectPix: () => void;
}

export const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  onClose,
  onSelectBoleto,
  onSelectPix,
}) => {
  return (
    <div className="absolute inset-0 z-50 bg-[#000000] text-white flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-2 flex-1 flex flex-col">
        <h1 className="text-[26px] font-bold tracking-tight text-white mb-8">
          Opções de pagamento
        </h1>

        {/* Action Circles */}
        <div className="flex items-center gap-10 mb-12">
          {/* Boleto */}
          <button
            onClick={onSelectBoleto}
            className="flex flex-col items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <BarcodeIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-[13px] font-medium text-center text-white/95">
              Boleto
            </span>
          </button>

          {/* Pix */}
          <button
            onClick={onSelectPix}
            className="flex flex-col items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <PixIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-[13px] font-medium text-center text-white/95">
              Pix
            </span>
          </button>
        </div>

        {/* Section: Mais opções */}
        <div className="space-y-4">
          <h2 className="text-[13px] font-semibold text-white/50 tracking-wider">
            Mais opções
          </h2>

          <div className="space-y-1">
            {/* Assistente de Pagamentos */}
            <div
              onClick={() => {}}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <RotateCcw className="w-5 h-5 text-white/70" />
                <span className="text-[15px] font-medium text-white/95">
                  Assistente de Pagamentos
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Débito Automático */}
            <div
              onClick={() => {}}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <RefreshCw className="w-5 h-5 text-white/70" />
                <span className="text-[15px] font-medium text-white/95">
                  Débito Automático
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
