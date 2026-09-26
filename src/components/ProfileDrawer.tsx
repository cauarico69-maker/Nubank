import React, { useState } from 'react';
import { X, Settings, Bell, ChevronRight, Plus, Building, RefreshCw, LogOut, Heart } from 'lucide-react';
import { UserAccount } from '../types';

interface ProfileDrawerProps {
  user: UserAccount;
  onClose: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  user,
  onClose,
  onLogout,
  onOpenSettings,
}) => {
  const [copied, setCopied] = useState(false);

  const copyAccountData = () => {
    navigator.clipboard?.writeText?.(
      `Banco 0260 - Nu Pagamentos S.A.\nAgência: ${user.agency}\nConta: ${user.accountNumber}\nFavorecido: ${user.fullName}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const photo =
    user.profilePhoto ||
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80';

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto p-6 animate-fade-in select-none">
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-6">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSettings}
              title="Configurações e edição de saldos"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => alert('Nenhuma notificação nova')}
              className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#820AD1]" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 py-3">
          <div
            onClick={onOpenSettings}
            title="Clique para editar dados e saldos"
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400/40 bg-[#9b2fe6] cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-md shrink-0"
          >
            <img src={photo} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <button
              onClick={copyAccountData}
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white mt-1 cursor-pointer"
            >
              <span>
                Agência {user.agency} • Conta {user.accountNumber}
              </span>
              <span className="text-[#a855f7] font-semibold flex items-center">
                {copied ? 'Copiado!' : 'Mais >'}
              </span>
            </button>
          </div>
        </div>

        {/* Configurações */}
        <div className="pt-6">
          <button
            onClick={onOpenSettings}
            className="w-full bg-[#121216] hover:bg-[#1c1c22] border border-white/5 active:scale-[0.99] rounded-2xl p-4 flex items-center gap-4 text-left transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">Configurações</h4>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>
        </div>

        {/* Outras Contas */}
        <div className="pt-6 space-y-2">
          <h3 className="text-xs font-semibold text-white/50 tracking-wider mb-3">
            Outras contas
          </h3>

          {/* Abrir conta Nu Empresas */}
          <button
            onClick={() => alert('Criar conta PJ gratuita')}
            className="w-full bg-[#121216] hover:bg-[#1c1c22] active:scale-[0.99] rounded-2xl p-4 flex items-center gap-4 text-left transition-all cursor-pointer border border-white/5"
          >
            <div className="w-10 h-10 rounded-full bg-[#820AD1]/20 flex items-center justify-center text-[#a855f7] shrink-0">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">Abrir conta Nu Empresas</h4>
              <p className="text-xs text-white/55 mt-0.5">
                Crie uma conta PJ gratuita para o seu negócio
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>

          {/* Open Finance */}
          <button
            onClick={() => alert('Open Finance Nubank')}
            className="w-full bg-[#121216] hover:bg-[#1c1c22] active:scale-[0.99] rounded-2xl p-4 flex items-center gap-4 text-left transition-all cursor-pointer border border-white/5"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">Open Finance</h4>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>

          {/* Trocar conta */}
          <button
            onClick={() => alert('Trocar conta internacional')}
            className="w-full bg-[#121216] hover:bg-[#1c1c22] active:scale-[0.99] rounded-2xl p-4 flex items-center gap-4 text-left transition-all cursor-pointer border border-white/5"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">Trocar conta</h4>
              <p className="text-xs text-white/55 mt-0.5">Contas de outros países</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>

          {/* Sair do aplicativo */}
          <button
            onClick={onLogout}
            className="w-full bg-[#121216] hover:bg-[#1c1c22] active:scale-[0.99] rounded-2xl p-4 flex items-center gap-4 text-left transition-all cursor-pointer border border-white/5"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-400">Sair do aplicativo</h4>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400/40" />
          </button>
        </div>
      </div>

      {/* Footer Avalie esta tela */}
      <div className="w-full flex items-center justify-center py-6">
        <button
          onClick={() => alert('Obrigado pelo feedback!')}
          className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <Heart className="w-4 h-4 text-purple-400" />
          <span>Avalie esta tela</span>
        </button>
      </div>
    </div>
  );
};
