import React, { useState } from 'react';
import { NuLogo } from './NuLogo';
import { Check, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SplashScreenProps {
  onUnlock: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onUnlock }) => {
  const [showFaceIdModal, setShowFaceIdModal] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');

  const handleStartUnlock = () => {
    setShowFaceIdModal(true);
    setScanState('scanning');

    // Smooth scan then success checkmark, directly unlocks into the app
    setTimeout(() => {
      setScanState('success');
      try {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.5 },
          colors: ['#820AD1', '#ffffff', '#22c55e'],
        });
      } catch {
        // ignore
      }
      setTimeout(() => {
        onUnlock();
      }, 650);
    }, 850);
  };

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between items-center bg-[#820AD1] text-white p-6 select-none overflow-hidden">
      {/* Background rich solid purple matching Nubank iOS */}
      <div className="absolute inset-0 bg-[#820AD1] pointer-events-none" />

      {/* Top spacer */}
      <div className="h-10 z-10" />

      {/* Center Nubank Logo - Clean official brand mark on purple background */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <button
          onClick={handleStartUnlock}
          className="focus:outline-none cursor-pointer active:scale-95 transition-transform"
          title="Desbloquear com biometria"
        >
          <NuLogo className="w-28 h-16 drop-shadow-lg text-white" color="#FFFFFF" />
        </button>
      </div>

      {/* Bottom Action: Usar senha do celular */}
      <div className="w-full z-10 pb-8 flex flex-col items-center">
        <button
          onClick={handleStartUnlock}
          className="w-full max-w-[340px] bg-white text-black font-semibold text-[15px] py-3.5 px-6 rounded-full active:scale-98 transition-all duration-200 shadow-xl text-center cursor-pointer hover:bg-white/95"
        >
          Usar senha do celular
        </button>
      </div>

      {/* Face ID Authentic iOS Modal Overlay */}
      {showFaceIdModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-[190px] aspect-square bg-[#1c1c1e]/95 border border-white/10 rounded-[28px] p-5 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            {/* Face ID Graphic Area */}
            <div className="w-20 h-20 relative flex items-center justify-center mb-3">
              {scanState === 'scanning' ? (
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* iOS Face ID Square Frame with 4 corner brackets */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-14 h-14">
                      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white rounded-tl-[3px]" />
                      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white rounded-tr-[3px]" />
                      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white rounded-bl-[3px]" />
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white rounded-br-[3px]" />

                      {/* Face icon interior */}
                      <div className="absolute inset-2 flex flex-col items-center justify-center gap-1.5 pt-1">
                        <div className="flex gap-2">
                          <div className="w-1 h-1 bg-white rounded-full" />
                          <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                        <div className="w-2.5 h-1 border-b border-l border-r border-white/70 rounded-b-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Verified Checkmark circle matching iOS Face ID overlay */
                <div className="w-14 h-14 rounded-full bg-transparent border-2 border-white flex items-center justify-center animate-scale-up shadow-md">
                  <Check className="w-8 h-8 text-white stroke-[2.5]" />
                </div>
              )}
            </div>

            {/* Modal Title */}
            <h3 className="text-sm font-semibold text-white tracking-wide">Face ID</h3>
          </div>
        </div>
      )}
    </div>
  );
};
