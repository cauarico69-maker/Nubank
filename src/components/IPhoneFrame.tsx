import React, { useState } from 'react';
import { Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  const [frameEnabled, setFrameEnabled] = useState(true);

  return (
    <div className="w-full min-h-[100dvh] bg-[#000000] sm:bg-[#070709] flex flex-col items-center justify-center relative p-0 sm:p-4 overflow-x-hidden">
      {/* Desktop view switcher toggle */}
      <div className="hidden sm:flex items-center gap-3 absolute top-4 right-6 z-50 bg-[#19191e]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-white/80 shadow-xl">
        <span className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-3.5 h-3.5 text-[#a855f7]" />
          Nubank
        </span>
        <div className="w-[1px] h-3 bg-white/20" />
        <button
          onClick={() => setFrameEnabled(!frameEnabled)}
          className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          title="Alternar modo moldura"
        >
          {frameEnabled ? (
            <>
              <Maximize2 className="w-3 h-3" />
              <span>Tela cheia</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3 h-3" />
              <span>Moldura</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: On mobile it is 100% full screen with 100dvh, on desktop it simulates a sleek device */}
      <div
        className={`w-full transition-all duration-200 relative flex flex-col ${
          frameEnabled
            ? 'sm:max-w-[392px] sm:h-[844px] sm:max-h-[92vh] sm:rounded-[40px] sm:border-[8px] sm:border-[#202024] sm:shadow-[0_25px_70px_rgba(0,0,0,0.9)] sm:ring-1 sm:ring-white/10'
            : 'max-w-[430px] min-h-[100dvh]'
        } bg-[#000000] text-white overflow-hidden h-[100dvh]`}
      >
        {/* App Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
