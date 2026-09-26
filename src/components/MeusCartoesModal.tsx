import React, { useState } from 'react';
import {
  ChevronLeft,
  Plus,
  Lock,
  Wallet,
  Eye,
  EyeOff,
  Copy,
  Check,
  HelpCircle,
  Hexagon,
  CreditCard,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { UserAccount } from '../types';

interface MeusCartoesModalProps {
  onClose: () => void;
  user: UserAccount;
}

export const MeusCartoesModal: React.FC<MeusCartoesModalProps> = ({ onClose, user }) => {
  const [currentView, setCurrentView] = useState<'list' | 'physical_details'>('list');
  const [showCardData, setShowCardData] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const printedName = user.printedCardName || 'CAUA SOUZA BARROS';
  const physicalDigits = user.cardLastDigits || '0082';
  const virtualDigits = user.cardVirtualDigits || '6504';
  const expiry = user.cardExpiry || '07/33';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in">
      {currentView === 'list' ? (
        /* SCREEN 1: Meus Cartões (Matching Screenshot 10:39:35 (3)) */
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={onClose}
                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7 text-white stroke-[2]" />
              </button>
              <h2 className="text-xl font-bold text-white tracking-tight">Meus cartões</h2>
            </div>

            {/* Top 3 Circular Action Buttons */}
            <div className="flex items-start justify-start gap-4 mb-8">
              {/* 1. Criar cartão virtual */}
              <div className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                <button
                  onClick={() => alert('Criar novo cartão virtual')}
                  className="w-14 h-14 rounded-full bg-[#820AD1] hover:bg-[#9413ec] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <Plus className="w-6 h-6 text-white stroke-[2.5]" />
                </button>
                <span className="text-[12px] font-medium text-white/90 leading-tight">
                  Criar cartão virtual
                </span>
              </div>

              {/* 2. Bloquear cartões */}
              <div className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  className="w-14 h-14 rounded-full bg-[#1e1e24] hover:bg-[#2a2a33] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                  <Lock className={`w-5 h-5 ${isLocked ? 'text-amber-400' : 'text-white'}`} />
                </button>
                <span className="text-[12px] font-medium text-white/90 leading-tight">
                  {isLocked ? 'Desbloquear' : 'Bloquear cartões'}
                </span>
              </div>

              {/* 3. Adicionar à carteira */}
              <div className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                <button
                  onClick={() => alert('Adicionar à Apple Wallet')}
                  className="w-14 h-14 rounded-full bg-[#1e1e24] hover:bg-[#2a2a33] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                  <Wallet className="w-5 h-5 text-white" />
                </button>
                <span className="text-[12px] font-medium text-white/90 leading-tight">
                  Adicionar à carteira
                </span>
              </div>
            </div>

            {/* Seção Virtuais (1) */}
            <div className="mb-6 space-y-2">
              <h3 className="text-base font-bold text-white mb-3">Virtuais (1)</h3>

              <div className="w-full bg-[#121216] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                {/* Virtual Card Item */}
                <div className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e24] border border-dashed border-white/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-white">virtual site</h4>
                    <p className="text-[12px] text-white/60">
                      •••• {virtualDigits} • Débito
                    </p>
                  </div>
                </div>

                {/* Criar novo cartão virtual */}
                <button
                  onClick={() => alert('Criar novo cartão virtual')}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#a855f7] shrink-0">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-[14px] font-medium text-[#c084fc]">
                    Criar novo cartão virtual
                  </span>
                </button>
              </div>
            </div>

            {/* Seção Físico */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white mb-3">Físico</h3>

              <div
                onClick={() => setCurrentView('physical_details')}
                className="w-full bg-[#121216] border border-white/5 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-[#1a1a20] active:scale-[0.99] transition-all"
              >
                {/* Small purple Nubank card thumbnail */}
                <div className="w-10 h-14 rounded-lg bg-gradient-to-b from-[#820AD1] to-[#530882] border border-white/10 p-1 flex flex-col justify-between shrink-0 shadow-md">
                  <div className="w-2.5 h-1.5 rounded-xs bg-amber-400/80" />
                  <div className="flex items-center gap-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/90" />
                    <div className="w-2 h-2 rounded-full bg-amber-400/90 -ml-1" />
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-[14px] font-semibold text-white">Roxinho Físico</h4>
                  <p className="text-[12px] text-white/60">
                    •••• {physicalDigits} • Débito
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SCREEN 2: Roxinho Físico Details (Matching Screenshot 10:39:36) */
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Top Bar with Back Arrow and Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('list')}
                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7 text-white stroke-[2]" />
              </button>
              <h2 className="text-xl font-bold text-white tracking-tight">Roxinho físico</h2>
            </div>

            {/* Action buttons: Bloquear cartão & Ver senha */}
            <div className="flex items-center justify-start gap-6 pt-1">
              {/* Bloquear cartão */}
              <div className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  className="w-14 h-14 rounded-full bg-[#1e1e24] hover:bg-[#2a2a33] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                  <Lock className={`w-5 h-5 ${isLocked ? 'text-amber-400' : 'text-white'}`} />
                </button>
                <span className="text-[12px] font-medium text-white/90 leading-tight">
                  {isLocked ? 'Desbloquear' : 'Bloquear cartão'}
                </span>
              </div>

              {/* Ver senha */}
              <div className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                <button
                  onClick={() => alert('Senha do cartão de 4 dígitos: ****')}
                  className="w-14 h-14 rounded-full bg-[#1e1e24] hover:bg-[#2a2a33] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                </button>
                <span className="text-[12px] font-medium text-white/90 leading-tight">
                  Ver senha
                </span>
              </div>
            </div>

            {/* Dados do cartão Header with "Ver dados" Eye toggle */}
            <div className="flex items-center justify-between pt-2">
              <h3 className="text-sm font-bold text-white tracking-wide">Dados do cartão</h3>
              <button
                onClick={() => setShowCardData(!showCardData)}
                className="flex items-center gap-1.5 text-xs text-[#c084fc] font-semibold cursor-pointer hover:text-white transition-colors"
              >
                {showCardData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showCardData ? 'Ocultar dados' : 'Ver dados'}</span>
              </button>
            </div>

            {/* Card Information Box (Matching exact 2x2 grid from screenshot) */}
            <div className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 shadow-lg">
              {/* Row 1: Nome impresso */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-white/50 block mb-0.5">Nome impresso</span>
                  <span className="text-sm font-bold font-mono tracking-wide text-white uppercase">
                    {printedName}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(printedName, 'nome')}
                  className="text-white/60 hover:text-white cursor-pointer p-1"
                >
                  {copiedItem === 'nome' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Row 2: Número */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-white/50 block mb-0.5">Número</span>
                  <span className="text-sm font-bold font-mono tracking-wider text-white">
                    {showCardData
                      ? `5348 8492 1049 ${physicalDigits}`
                      : `•••• •••• •••• ••••`}
                  </span>
                </div>
                {showCardData && (
                  <button
                    onClick={() =>
                      handleCopy(`5348 8492 1049 ${physicalDigits}`, 'numero')
                    }
                    className="text-white/60 hover:text-white cursor-pointer p-1"
                  >
                    {copiedItem === 'numero' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Row 3: Validade & CVC */}
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-white/50 block mb-0.5">Validade</span>
                    <span className="text-sm font-bold font-mono text-white">{expiry}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(expiry, 'validade')}
                    className="text-white/60 hover:text-white cursor-pointer p-1"
                  >
                    {copiedItem === 'validade' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-white/50 block mb-0.5">CVC</span>
                    <span className="text-sm font-semibold text-white/70">
                      {showCardData ? '481' : 'Indisponível'}
                    </span>
                  </div>
                  <HelpCircle className="w-4 h-4 text-white/40" />
                </div>
              </div>

              {/* Row 4: Função & Mastercard Gold Logo */}
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-4">
                  <span className="text-[11px] text-white/50 block mb-0.5">Função</span>
                  <span className="text-sm font-semibold text-white">Débito</span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-white/50 block mb-0.5">Mastercard</span>
                    <span className="text-sm font-semibold text-white">Gold</span>
                  </div>
                  {/* Official Mastercard Intersecting Circles */}
                  <div className="flex items-center -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-[#EB001B]" />
                    <div className="w-5 h-5 rounded-full bg-[#F79E1B] mix-blend-screen" />
                  </div>
                </div>
              </div>
            </div>

            {/* Configure o cartão Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Configure o cartão
              </h3>

              <div className="space-y-2">
                {/* Controles do cartão */}
                <button
                  onClick={() => alert('Controles do cartão')}
                  className="w-full bg-[#121216] hover:bg-[#1a1a20] rounded-2xl p-4 flex items-center gap-4 text-left transition-colors border border-white/5 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 shrink-0">
                    <Hexagon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-white">Controles do cartão</h4>
                    <p className="text-xs text-white/55 mt-0.5">
                      Personalize as funções do seu cartão do seu jeito.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>

                {/* Substituir cartão */}
                <button
                  onClick={() => alert('Solicitação de substituição')}
                  className="w-full bg-[#121216] hover:bg-[#1a1a20] rounded-2xl p-4 flex items-center gap-4 text-left transition-colors border border-white/5 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-white">Substituir cartão</h4>
                    <p className="text-xs text-white/55 mt-0.5">
                      Peça uma reemissão se o seu cartão foi...
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
