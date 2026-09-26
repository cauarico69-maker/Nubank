import React, { useState } from 'react';
import { ChevronLeft, Flashlight, Camera, Image } from 'lucide-react';

interface PixScannerScreenProps {
  onBack: () => void;
  onScanSuccess: (code: string) => void;
}

export const PixScannerScreen: React.FC<PixScannerScreenProps> = ({ onBack, onScanSuccess }) => {
  const [flashlightOn, setFlashlightOn] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between select-none animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between p-6 z-20">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => setFlashlightOn(!flashlightOn)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            flashlightOn ? 'bg-amber-400 text-black' : 'bg-black/40 text-white'
          }`}
        >
          <Flashlight className="w-5 h-5" />
        </button>
      </div>

      {/* Center Viewfinder */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <p className="text-xs text-white/80 max-w-[240px] mb-8 leading-relaxed">
          Para fazer o pagamento, aponte a câmera para o QR Code.
        </p>

        {/* Viewfinder frame */}
        <div className="relative w-64 h-64 rounded-3xl border-2 border-dashed border-purple-400/80 overflow-hidden flex items-center justify-center bg-black/30 backdrop-blur-xs">
          {/* Animated scanning bar */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent animate-pulse" />

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-lg" />

          <Camera className="w-12 h-12 text-white/20" />
        </div>

        {/* Mock scan test button */}
        <button
          onClick={() => onScanSuccess('00020126580014br.gov.bcb.pix0136renata@exemplo.com520400005303986540510.005802BR5925Renata Patricia6009Sao Paulo62070503***6304')}
          className="mt-8 bg-white/15 hover:bg-white/25 active:scale-95 text-xs text-white px-4 py-2 rounded-full cursor-pointer transition-colors"
        >
          Simular leitura de QR Code
        </button>
      </div>

      {/* Bottom options */}
      <div className="p-6 flex justify-center z-20 pb-10">
        <button
          onClick={() => alert('Selecionar imagem da galeria')}
          className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
        >
          <Image className="w-4 h-4" />
          <span>Carregar da galeria</span>
        </button>
      </div>
    </div>
  );
};
