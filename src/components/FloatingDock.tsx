import React from 'react';
import { ArrowUpDown, Smartphone } from 'lucide-react';

interface FloatingDockProps {
  currentTab: 'home' | 'nucel';
  onSelectTab: (tab: 'home' | 'nucel') => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ currentTab, onSelectTab }) => {
  return (
    <div className="fixed sm:absolute bottom-5 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-[#19191d]/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
        {/* Home / Finance Toggle (⇅) */}
        <button
          onClick={() => onSelectTab('home')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
            currentTab === 'home'
              ? 'bg-[#820AD1] text-white shadow-md scale-105'
              : 'text-white/60 hover:text-white'
          }`}
          title="Conta e Finanças"
        >
          <ArrowUpDown className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* NuCel / Shopping Toggle */}
        <button
          onClick={() => onSelectTab('nucel')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
            currentTab === 'nucel'
              ? 'bg-[#820AD1] text-white shadow-md scale-105'
              : 'text-white/60 hover:text-white'
          }`}
          title="NuCel"
        >
          <Smartphone className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};
