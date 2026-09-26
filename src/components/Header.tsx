import React from 'react';
import { UserAccount } from '../types';
import { NuEyeIcon, NuHelpIcon, NuShieldIcon } from './NuLogo';

interface HeaderProps {
  user: UserAccount;
  onToggleBalanceVisibility: () => void;
  onOpenProfile: () => void;
  onOpenHelp: () => void;
  onOpenProtectionCenter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onToggleBalanceVisibility,
  onOpenProfile,
  onOpenHelp,
  onOpenProtectionCenter,
}) => {
  return (
    <header className="w-full bg-[#530882] text-white pt-4 pb-5 px-5 select-none shadow-sm">
      {/* Top Icons Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Profile Avatar with white badge */}
        <button
          onClick={onOpenProfile}
          className="relative group cursor-pointer focus:outline-none"
          title="Ver perfil"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 bg-[#6d0fa8] flex items-center justify-center shadow-md transition-transform active:scale-95">
            {/* Selfie photo matching user */}
            <img
              src={
                user.profilePhoto ||
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
              }
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Small white dot badge */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#530882]" />
        </button>

        {/* Action icons: Eye, Help, Shield (matching Image 7) */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Eye Toggle */}
          <button
            onClick={onToggleBalanceVisibility}
            className="text-white hover:text-white/80 active:scale-90 transition-transform cursor-pointer p-1"
            title={user.isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            <NuEyeIcon isOpen={user.isBalanceVisible} className="w-[26px] h-[26px]" />
          </button>

          {/* Help "?" */}
          <button
            onClick={onOpenHelp}
            className="text-white hover:text-white/80 active:scale-90 transition-transform cursor-pointer p-1"
            title="Ajuda"
          >
            <NuHelpIcon className="w-[26px] h-[26px]" />
          </button>

          {/* Shield / Central de proteção */}
          <button
            onClick={onOpenProtectionCenter}
            className="text-white hover:text-white/80 active:scale-90 transition-transform cursor-pointer p-1"
            title="Central de Proteção"
          >
            <NuShieldIcon className="w-[26px] h-[26px]" />
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div>
        <h1 className="text-[17px] font-bold tracking-tight text-white">
          Olá, {user.name}
        </h1>
      </div>
    </header>
  );
};
