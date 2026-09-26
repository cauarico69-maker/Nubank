import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  X,
  BarChart3,
  Target,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import { Caixinha, UserAccount } from '../types';
import { NuHelpIcon } from './NuLogo';
import { formatBRL } from '../utils/formatCurrency';

interface CaixinhasScreenProps {
  user: UserAccount;
  caixinhas: Caixinha[];
  onBack: () => void;
  onAddCaixinha: (newCaixinha: Caixinha) => void;
  onDepositInCaixinha: (id: string, amount: number) => boolean;
  onWithdrawFromCaixinha: (id: string, amount: number) => boolean;
}

export const CaixinhasScreen: React.FC<CaixinhasScreenProps> = ({
  user,
  caixinhas,
  onBack,
  onAddCaixinha,
  onDepositInCaixinha,
  onWithdrawFromCaixinha,
}) => {
  // If there's at least one caixinha, we can view its details matching Image 6
  const [selectedCaixinha, setSelectedCaixinha] = useState<Caixinha | null>(caixinhas[0] || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newC: Caixinha = {
      id: `c_${Date.now()}`,
      name: name.trim(),
      amount: 0,
      customAmountDisplay: '0,00',
      goal: goal ? parseFloat(goal.replace(/\./g, '').replace(',', '.')) : 1000,
      image:
        '/src/assets/images/focar_carreira_phone_1790000181503.jpg',
      rendimento: '100% do CDI',
    };

    onAddCaixinha(newC);
    setSelectedCaixinha(newC);
    setName('');
    setGoal('');
    setShowCreateModal(false);
    triggerToast('Caixinha criada com sucesso!');
  };

  const activeItem = selectedCaixinha || caixinhas[0];

  // If viewing single Caixinha details, render exact Image 6 layout
  if (activeItem) {
    const brutoFormatted = formatBRL(activeItem.amount, activeItem.customAmountDisplay);
    const liquidoFormatted =
      activeItem.totalLiquidoDisplay ||
      formatBRL(Math.max(0, activeItem.amount * 0.9967));
    const rendimentoFormatted =
      activeItem.rendimentoDisplay ||
      formatBRL(Math.max(0, activeItem.amount * 0.0146));

    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in pb-8">
        {/* Toast */}
        {toastMsg && (
          <div className="fixed top-12 left-1/2 -translate-x-1/2 z-60 bg-[#222228] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-white/10 animate-fade-in flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#820AD1]" />
            <span>{toastMsg}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Top navigation matching Image 6: X on left, ? and Settings on right */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <button
              onClick={onBack}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white/90"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => triggerToast('Ajuda sobre Caixinhas')}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white/90"
              >
                <NuHelpIcon className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => triggerToast('Configurações da Caixinha')}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white/90"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Header section matching Image 6 */}
          <div className="px-6 space-y-1.5">
            <span className="text-[13px] font-medium text-white/70">Total bruto</span>
            <div className="text-[34px] font-black tracking-tight text-white">
              R$ {brutoFormatted}
            </div>
            <div className="text-[13px] text-white/70 font-normal pt-0.5">
              Total líquido · R$ {liquidoFormatted}
            </div>
          </div>

          {/* Action / Detail Rows matching Image 6 */}
          <div className="px-6 space-y-4 pt-2">
            {/* Row 1: Rendimento bruto */}
            <div
              onClick={() => triggerToast('Extrato de rendimento bruto')}
              className="flex items-center justify-between py-2 cursor-pointer group active:opacity-80"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#18181d] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[14px] font-semibold text-white">Rendimento bruto</span>
              </div>
              <div className="text-[14px] font-bold text-emerald-400">
                ↑ R$ {rendimentoFormatted}
              </div>
            </div>

            {/* Row 2: Programar Caixinha */}
            <div
              onClick={() => triggerToast('Programar depósitos automáticos')}
              className="flex items-center justify-between py-2 cursor-pointer group active:opacity-80"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#18181d] flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-white">Programar Caixinha</h4>
                  <p className="text-[12px] text-white/60">Para você chegar lá mais rápido</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div className="h-[1px] bg-white/10 mx-6" />

          {/* Section: Investimentos nesta Caixinha matching Image 6 */}
          <div className="px-6 space-y-3 pt-1">
            <h3 className="text-[15px] font-bold text-white">Investimentos nesta Caixinha</h3>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Acompanhe os rendimentos e acesse os detalhes de cada investimento nesta Caixinha.{' '}
              <button
                onClick={() => triggerToast('Detalhes dos investimentos')}
                className="text-[#a855f7] hover:underline font-medium inline"
              >
                Saiba mais.
              </button>
            </p>

            {/* Investment Item Card */}
            <div
              onClick={() => triggerToast('Detalhes do Nu Reserva Imediata')}
              className="bg-[#141418] border border-white/5 hover:border-white/15 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all active:scale-99 mt-2"
            >
              <div className="space-y-0.5">
                <h4 className="text-[14px] font-bold text-white">Nu Reserva Imediata</h4>
                <p className="text-[12px] text-white/50">Resgate em até 1 dia útil</p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-[14px] font-bold text-white">R$ {brutoFormatted}</p>
                <p className="text-[12px] font-semibold text-emerald-400">
                  ↑ R$ {rendimentoFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Feedback matching Image 6 */}
          <div className="pt-4 pb-2 flex justify-center">
            <button
              onClick={() => triggerToast('Obrigado pela sua avaliação!')}
              className="text-[13px] font-semibold text-[#a855f7] hover:text-[#c084fc] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>💜 O que achou desta experiência?</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Guardar and Resgatar */}
        <div className="px-6 pt-4 flex gap-3">
          <button
            onClick={() => setShowDepositModal(true)}
            className="flex-1 bg-[#820AD1] hover:bg-[#9214e6] active:scale-95 text-white font-bold text-[14px] py-3.5 rounded-full transition-all cursor-pointer text-center shadow-lg"
          >
            Guardar
          </button>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="flex-1 bg-[#1a1a20] hover:bg-[#25252e] active:scale-95 text-white font-bold text-[14px] py-3.5 rounded-full transition-all cursor-pointer text-center border border-white/10"
          >
            Resgatar
          </button>
        </div>

        {/* Modal: Guardar Dinheiro */}
        {showDepositModal && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
            <div className="w-full max-w-[380px] bg-[#16161b] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-base font-bold">Guardar dinheiro</h3>
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Valor a guardar</span>
                  <span>Saldo disponível: R$ {formatBRL(user.balance)}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-white/50">
                    R$
                  </span>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    autoFocus
                    className="w-full bg-[#202026] rounded-xl pl-10 pr-4 py-3 text-base font-bold text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const cleaned = depositAmount.replace(/\./g, '').replace(',', '.');
                  const amt = parseFloat(cleaned);
                  if (isNaN(amt) || amt <= 0) {
                    triggerToast('Digite um valor válido');
                    return;
                  }
                  if (user.balance < amt) {
                    triggerToast('Saldo insuficiente na conta!');
                    return;
                  }
                  const success = onDepositInCaixinha(activeItem.id, amt);
                  if (success) {
                    setSelectedCaixinha((prev) =>
                      prev ? { ...prev, amount: prev.amount + amt, customAmountDisplay: undefined } : null
                    );
                    setDepositAmount('');
                    setShowDepositModal(false);
                    triggerToast(`R$ ${formatBRL(amt)} guardados na Caixinha!`);
                  } else {
                    triggerToast('Saldo insuficiente na conta!');
                  }
                }}
                className="w-full bg-[#820AD1] hover:bg-[#9214e6] font-bold text-sm py-3.5 rounded-full transition-all cursor-pointer shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* Modal: Resgatar Dinheiro */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
            <div className="w-full max-w-[380px] bg-[#16161b] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-base font-bold">Resgatar dinheiro</h3>
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Valor a resgatar</span>
                  <span>Na Caixinha: R$ {formatBRL(activeItem.amount)}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-white/50">
                    R$
                  </span>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    autoFocus
                    className="w-full bg-[#202026] rounded-xl pl-10 pr-4 py-3 text-base font-bold text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const cleaned = withdrawAmount.replace(/\./g, '').replace(',', '.');
                  const amt = parseFloat(cleaned);
                  if (isNaN(amt) || amt <= 0) {
                    triggerToast('Digite um valor válido');
                    return;
                  }
                  if (activeItem.amount < amt) {
                    triggerToast('Saldo insuficiente na Caixinha!');
                    return;
                  }
                  const success = onWithdrawFromCaixinha(activeItem.id, amt);
                  if (success) {
                    setSelectedCaixinha((prev) =>
                      prev ? { ...prev, amount: Math.max(0, prev.amount - amt), customAmountDisplay: undefined } : null
                    );
                    setWithdrawAmount('');
                    setShowWithdrawModal(false);
                    triggerToast(`R$ ${formatBRL(amt)} resgatados para a conta!`);
                  } else {
                    triggerToast('Saldo insuficiente na Caixinha!');
                  }
                }}
                className="w-full bg-[#820AD1] hover:bg-[#9214e6] font-bold text-sm py-3.5 rounded-full transition-all cursor-pointer shadow-md"
              >
                Confirmar resgate
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback if no caixinha exists
  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in p-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button onClick={onBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-sm font-bold">Caixinhas</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <Plus className="w-12 h-12 text-[#00c8f8]" />
        <h3 className="text-lg font-bold">Crie sua primeira caixinha</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#820AD1] hover:bg-[#9214e6] text-white font-bold text-xs py-3.5 px-6 rounded-full"
        >
          Criar Caixinha
        </button>
      </div>

      {showCreateModal && (
        <form onSubmit={handleCreate} className="p-6 bg-[#16161b] rounded-3xl space-y-4">
          <input
            type="text"
            placeholder="Nome da caixinha"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#202026] rounded-xl px-4 py-3 text-xs text-white"
          />
          <button type="submit" className="w-full bg-[#820AD1] py-3 rounded-full text-xs font-bold">
            Criar
          </button>
        </form>
      )}
    </div>
  );
};
