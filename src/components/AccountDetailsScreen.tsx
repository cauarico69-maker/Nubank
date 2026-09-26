import React, { useState } from 'react';
import {
  ChevronLeft,
  HelpCircle,
  MoreVertical,
  ChevronRight,
  Plus,
  ArrowUpRight,
  SlidersHorizontal,
  BarChart2,
  Search,
  ShoppingBag,
  ArrowDownLeft,
  Heart,
  CreditCard,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { UserAccount, HistoryTransaction } from '../types';
import { MOCK_ACCOUNT_HISTORY } from '../data/mockData';
import { BarcodeIcon, PixIcon, NuHelpIcon } from './NuLogo';
import { formatBRL } from '../utils/formatCurrency';

interface AccountDetailsScreenProps {
  user: UserAccount;
  accountHistory?: HistoryTransaction[];
  onBack: () => void;
  onOpenTransfer: () => void;
  onOpenCaixinhas: () => void;
  onOpenHelp: () => void;
}

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({
  user,
  accountHistory,
  onBack,
  onOpenTransfer,
  onOpenCaixinhas,
  onOpenHelp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rated, setRated] = useState(false);

  const transactionsList = (accountHistory || MOCK_ACCOUNT_HISTORY).filter(
    (tx) => tx.dateGroup !== 'Hoje'
  );

  // Group transactions by dateGroup
  const filtered = transactionsList.filter(
    (tx) =>
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by dateGroup preserving order
  const groupedDates: { date: string; items: HistoryTransaction[] }[] = [];
  filtered.forEach((tx) => {
    let group = groupedDates.find((g) => g.date === tx.dateGroup);
    if (!group) {
      group = { date: tx.dateGroup, items: [] };
      groupedDates.push(group);
    }
    group.items.push(tx);
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in no-scrollbar pb-10">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenHelp}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
            >
              <NuHelpIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => alert('Opções da conta')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Saldo Disponível */}
        <div className="px-6 pt-2 pb-4 space-y-1">
          <span className="text-[13px] text-white/70 font-normal">Saldo disponível</span>
          <div className="text-[28px] font-bold tracking-tight text-white">
            {user.isBalanceVisible ? `R$ ${formatBRL(user.balance, user.customBalanceDisplay)}` : '••••'}
          </div>
        </div>

        {/* Sub-cards */}
        <div className="px-6 space-y-3 pt-1">
          {/* Saldo Separado */}
          <div
            onClick={onOpenCaixinhas}
            className="flex items-center justify-between py-3.5 border-b border-white/5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-white/70 stroke-[1.7]" />
              <div>
                <span className="text-[14px] font-medium text-white block">Saldo Separado</span>
                <span className="text-[13px] font-bold text-white">
                  R$ {formatBRL(user.totalCaixinhas)}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>

          {/* Assistente de Pagamentos */}
          <div
            onClick={() => alert('Assistente de Pagamentos Nubank')}
            className="flex items-center justify-between py-3.5 border-b border-white/5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-white/70 stroke-[1.7]" />
              <div>
                <span className="text-[14px] font-medium text-white block">
                  Tudo certo com suas contas?
                </span>
                <span className="text-[12px] text-white/50 block">
                  Ir para Assistente de pagamentos
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="px-6 py-6 flex items-start gap-4 overflow-x-auto no-scrollbar">
          {/* Trazer dinheiro */}
          <button
            onClick={() => alert('Trazer dinheiro por Pix ou boleto')}
            className="flex flex-col items-center gap-2.5 min-w-[70px] group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#820AD1] group-hover:bg-[#9214e6] active:scale-95 flex items-center justify-center text-white transition-all shadow-md">
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span className="text-[12px] font-medium text-center text-white leading-tight">
              Trazer dinheiro
            </span>
          </button>

          {/* Transferir */}
          <button
            onClick={onOpenTransfer}
            className="flex flex-col items-center gap-2.5 min-w-[70px] group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#1c1c20] group-hover:bg-[#27272e] active:scale-95 flex items-center justify-center text-white transition-all">
              <ArrowUpRight className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-[12px] font-medium text-center text-white leading-tight">
              Transferir
            </span>
          </button>

          {/* Pagar */}
          <button
            onClick={() => alert('Pagar boleto ou código de barras')}
            className="flex flex-col items-center gap-2.5 min-w-[70px] group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#1c1c20] group-hover:bg-[#27272e] active:scale-95 flex items-center justify-center text-white transition-all">
              <BarcodeIcon className="w-6 h-6" color="#ffffff" />
            </div>
            <span className="text-[12px] font-medium text-center text-white leading-tight">
              Pagar
            </span>
          </button>

          {/* Caixinhas */}
          <button
            onClick={onOpenCaixinhas}
            className="flex flex-col items-center gap-2.5 min-w-[70px] group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#1c1c20] group-hover:bg-[#27272e] active:scale-95 flex items-center justify-center text-white transition-all">
              <Lock className="w-6 h-6 text-white stroke-[2]" />
            </div>
            <span className="text-[12px] font-medium text-center text-white leading-tight">
              Caixinhas
            </span>
          </button>
        </div>

        {/* Avalie esta tela */}
        <div className="px-6 py-1">
          <button
            onClick={() => setRated(!rated)}
            className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${rated ? 'fill-purple-400 text-purple-400' : 'text-purple-400'}`} />
            <span>Avalie esta tela</span>
          </button>
        </div>

        {/* Section: Histórico */}
        <div className="pt-6 px-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-white tracking-tight">Histórico</h2>
            <div className="flex items-center gap-3 text-purple-400">
              <button
                onClick={() => alert('Ordenar transações')}
                className="hover:text-purple-300 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert('Gráfico de gastos')}
                className="hover:text-purple-300 cursor-pointer"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181c] border border-white/5 focus:border-[#820AD1] rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Transactions grouped by date */}
          <div className="pt-2 space-y-6">
            {groupedDates.map((group) => (
              <div key={group.date} className="space-y-3">
                <span className="text-[12px] font-semibold text-white/50 block">
                  {group.date}
                </span>

                <div className="space-y-1 divide-y divide-white/5">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => alert(`Detalhes de: ${item.title}`)}
                      className="flex items-center justify-between py-3 hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
                    >
                      {/* Left: Icon & Info */}
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-10 h-10 rounded-full bg-[#18181c] flex items-center justify-center shrink-0">
                          {item.iconType === 'bag' && (
                            <ShoppingBag className="w-4 h-4 text-white/80" />
                          )}
                          {item.iconType === 'pix' && (
                            <div className="text-white/80 flex items-center justify-center">
                              <PixIcon className="w-4 h-4" color={item.isPositive ? '#10b981' : '#ffffff'} />
                            </div>
                          )}
                          {item.iconType === 'transfer' && (
                            <ArrowDownLeft className="w-4 h-4 text-[#10b981]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-white/50">
                            {item.time} • {item.category}
                          </p>
                        </div>
                      </div>

                      {/* Right: Amount */}
                      <div className="shrink-0 text-right">
                        <span
                          className={`text-[13px] font-bold ${
                            item.isPositive ? 'text-[#10b981]' : 'text-white'
                          }`}
                        >
                          {item.isPositive ? '+ ' : ''}R$ {formatBRL(item.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {groupedDates.length === 0 && (
              <div className="py-8 text-center text-xs text-white/40">
                Nenhuma transação encontrada para "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
