import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Flashlight } from 'lucide-react';

interface BarcodeScannerModalProps {
  onBack: () => void;
  onManualInput: () => void;
  onCodeDetected?: (code: string) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  onBack,
  onManualInput,
  onCodeDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setHasCamera(true);
          }
        })
        .catch(() => {
          setHasCamera(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-[#000000] text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Background camera feed or simulated camera view matching video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0c10]">
        {hasCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="relative w-full h-full bg-gradient-to-b from-[#111116] via-[#0b0b10] to-[#050508] flex items-center justify-center">
            {/* Ambient background matching the video (dark room with keyboard / desk aesthetic) */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e1e2d_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-32 bg-red-600/10 rounded-full blur-3xl" />
            <div className="absolute top-40 left-1/3 w-64 h-32 bg-blue-600/10 rounded-full blur-3xl" />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-12 pb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-white/90 hover:text-white active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
          <span className="text-[17px] font-medium tracking-tight">
            Escaneie o código de barras
          </span>
        </button>
      </div>

      {/* Viewfinder Center Box */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-full max-w-[340px] h-[160px] rounded-3xl border-2 border-white/90 shadow-[0_0_25px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
          {/* Laser scanning line animation */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ef4444] animate-pulse" />

          {/* Guide hint */}
          <div className="text-[12px] font-medium text-white/50 tracking-wide text-center px-4">
            Alinhe o código de barras aqui
          </div>
        </div>
      </div>

      {/* Bottom Button: Digitar manualmente */}
      <div className="relative z-10 px-6 pb-12 flex justify-center">
        <button
          onClick={onManualInput}
          className="bg-white hover:bg-white/90 active:scale-[0.98] text-black font-semibold text-[15px] px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer"
        >
          Digitar manualmente
        </button>
      </div>
    </div>
  );
};
