import React, { useState } from 'react';
import { ChevronLeft, History, ChevronRight, Shield, ShieldCheck, Lock, Smartphone, FileText } from 'lucide-react';
import { UserAccount } from '../types';

interface ProtectionCenterScreenProps {
  user: UserAccount;
  onBack: () => void;
  onToggleStreetMode: () => void;
}

export const ProtectionCenterScreen: React.FC<ProtectionCenterScreenProps> = ({
  user,
  onBack,
  onToggleStreetMode,
}) => {
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col overflow-y-auto select-none animate-fade-in pb-10">
      {/* Toast */}
      {toast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-60 bg-[#25252b] border border-white/10 text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-white/5">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-base font-semibold">Central de Proteção</h2>
        <button
          onClick={() => showNotification('Histórico de segurança recente limpo')}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
        >
          <History className="w-5 h-5 text-white/80" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Security status card "3 de 4" */}
        <div className="w-full bg-[#121216] border border-white/10 rounded-3xl p-5 flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#820AD1]"
                strokeDasharray={`${user.streetModeActive ? '100' : '75'}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-purple-300">
              {user.streetModeActive ? '4 de 4' : '3 de 4'}
            </span>
          </div>

          <div className="flex-1">
            <p className="text-xs font-medium text-white/90 leading-snug">
              Para ter mais segurança, ative as camadas de proteção.
            </p>
            <button
              onClick={() => showNotification('Suas proteções estão em alto nível!')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1 cursor-pointer"
            >
              <span>Suas proteções</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modo Rua */}
        <div className="w-full bg-[#121216] border border-white/10 rounded-3xl p-5 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Modo Rua</h3>
            </div>
            <p className="text-xs text-white/60 mt-1 max-w-[210px] leading-tight">
              Ative para proteger suas transações com biometria facial fora de casa.
            </p>
          </div>

          <button
            onClick={() => {
              onToggleStreetMode();
              showNotification(
                user.streetModeActive ? 'Modo Rua desativado' : 'Modo Rua ativado com sucesso!'
              );
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              user.streetModeActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-[#820AD1] hover:bg-[#9312eb] text-white active:scale-95'
            }`}
          >
            {user.streetModeActive ? 'Ativado' : 'Ativar'}
          </button>
        </div>

        {/* Mais opções de proteção */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-white/50 tracking-wider">
            Mais opções de proteção
          </h3>

          <div className="divide-y divide-white/5">
            {/* Seguros */}
            <div
              onClick={() => showNotification('Seguro Celular e Vida Nubank')}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Seguros</h4>
                  <p className="text-xs text-white/50 mt-0.5">
                    Proteção para tudo que importa a partir de R$ 10,00 por mês
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
            </div>

            {/* Ajustes de segurança */}
            <div
              onClick={() => showNotification('Ajustes de segurança')}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Ajustes de segurança</h4>
                  <p className="text-xs text-white/50 mt-0.5">Senhas e acessos</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
            </div>

            {/* Configurar Pix */}
            <div
              onClick={() => showNotification('Limites Pix diurnos e noturnos')}
              className="py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Configurar Pix</h4>
                  <p className="text-xs text-white/50 mt-0.5">Limites e contatos de confiança</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
            </div>
          </div>
        </div>

        {/* Mais sobre segurança */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-white/50 tracking-wider">
            Mais sobre segurança
          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              onClick={() => showNotification('Guia: O que fazer em caso de roubo ou perda')}
              className="min-w-[170px] bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-white/20"
            >
              <FileText className="w-6 h-6 text-purple-400 mb-4" />
              <p className="text-xs font-semibold text-white leading-snug">
                O que fazer caso roub...
              </p>
            </div>
            <div
              onClick={() => showNotification('Guia NuPay')}
              className="min-w-[170px] bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-white/20"
            >
              <Shield className="w-6 h-6 text-purple-400 mb-4" />
              <p className="text-xs font-semibold text-white leading-snug">
                NuPay: Pagamentos m...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
