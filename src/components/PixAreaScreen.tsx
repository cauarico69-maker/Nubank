import React, { useState } from 'react';
import { X, HelpCircle, Calendar, QrCode, Copy, MessageCircleQuestion, Download, ChevronRight, ShieldAlert, ArrowRightLeft, Key, Sliders } from 'lucide-react';
import { PixIcon } from './NuLogo';

interface PixAreaScreenProps {
  onClose: () => void;
  onOpenHelp: () => void;
  onStartTransfer: () => void;
  onStartScheduledPix: () => void;
  onStartQrScanner: () => void;
  onStartCopiaCola: () => void;
}

export const PixAreaScreen: React.FC<PixAreaScreenProps> = ({
  onClose,
  onOpenHelp,
  onStartTransfer,
  onStartScheduledPix,
  onStartQrScanner,
  onStartCopiaCola,
}) => {
  const [toast, setToast] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col overflow-y-auto select-none animate-fade-in pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-60 bg-[#25252b] border border-white/10 text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#820AD1]" />
          {toast}
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={onOpenHelp}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="px-6 pt-2 pb-6 space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-white">Área Pix</h1>

        {/* 6 Actions Grid (2 rows of 3) */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-3 py-2">
          {/* 1. Transferir */}
          <button
            onClick={onStartTransfer}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <ArrowRightLeft className="w-6 h-6 text-white stroke-[2]" />
            </div>
            <span className="text-xs font-medium text-center text-white/95">
              Transferir
            </span>
          </button>

          {/* 2. Pix Agendado */}
          <button
            onClick={onStartScheduledPix}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <Calendar className="w-6 h-6 text-white stroke-[1.8]" />
            </div>
            <span className="text-xs font-medium text-center text-white/95 leading-tight">
              Pix Agendado
            </span>
          </button>

          {/* 3. Ler QR code */}
          <button
            onClick={onStartQrScanner}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <QrCode className="w-6 h-6 text-white stroke-[1.8]" />
            </div>
            <span className="text-xs font-medium text-center text-white/95 leading-tight">
              Ler QR code
            </span>
          </button>

          {/* 4. Pix Copia e Cola */}
          <button
            onClick={onStartCopiaCola}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <Copy className="w-6 h-6 text-white stroke-[1.8]" />
            </div>
            <span className="text-xs font-medium text-center text-white/95 leading-tight">
              Pix Copia e Cola
            </span>
          </button>

          {/* 5. Cobrar */}
          <button
            onClick={() => showFeedback('Gerando cobrança Pix...')}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <MessageCircleQuestion className="w-6 h-6 text-white stroke-[1.8]" />
            </div>
            <span className="text-xs font-medium text-center text-white/95 leading-tight">
              Cobrar
            </span>
          </button>

          {/* 6. Depositar */}
          <button
            onClick={() => showFeedback('Dados para depósito via Pix ou TED')}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[66px] h-[66px] rounded-full bg-[#1c1c20] hover:bg-[#28282e] group-hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
              <Download className="w-6 h-6 text-white stroke-[1.8]" />
            </div>
            <span className="text-xs font-medium text-center text-white/95 leading-tight">
              Depositar
            </span>
          </button>
        </div>

        {/* Preferences Section */}
        <div className="pt-4 space-y-2">
          <h3 className="text-xs font-semibold text-white/50 tracking-wider mb-2">
            Preferências
          </h3>

          <div className="divide-y divide-white/5">
            {/* Pix automático */}
            <div
              onClick={() => showFeedback('Pix Automático disponível para faturas recorrentes')}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white">Pix automático</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>

            {/* Registrar ou trazer chaves */}
            <div
              onClick={() => showFeedback('Suas chaves cadastradas: CPF e Celular')}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white">Registrar ou trazer chaves</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>

            {/* Meus limites */}
            <div
              onClick={() => showFeedback('Limite diurno: R$ 5.000,00 | Noturno: R$ 1.000,00')}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white">Meus limites</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="pt-2 space-y-2">
          <h3 className="text-xs font-semibold text-white/50 tracking-wider mb-2">
            Suporte
          </h3>

          <div
            onClick={() => showFeedback('Canal de contestação de transações Pix')}
            className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Contestação de transações Pix</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
