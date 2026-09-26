import React, { useState } from 'react';
import { ChevronLeft, ArrowRight, Delete, Check, ShieldCheck } from 'lucide-react';
import { UserAccount, Transaction } from '../types';

interface BoletoManualInputModalProps {
  user: UserAccount;
  onBack: () => void;
  onCompletePayment: (amount: number, tx: Transaction) => void;
}

export const BoletoManualInputModal: React.FC<BoletoManualInputModalProps> = ({
  user,
  onBack,
  onCompletePayment,
}) => {
  const [digits, setDigits] = useState('');
  const [step, setStep] = useState<'input' | 'confirm' | 'pin' | 'success'>('input');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleKeyPress = (num: string) => {
    if (digits.length < 47) {
      setDigits((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setDigits((prev) => prev.slice(0, -1));
  };

  // Format the boleto line nicely: XXXXX.XXXXX XXXXX.XXXXXX ...
  const formatBoletoDigits = (val: string) => {
    if (!val) return '';
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i === 5 || i === 15 || i === 26 || i === 32) {
        formatted += '.';
      } else if (i === 10 || i === 21 || i === 31) {
        formatted += ' ';
      }
      formatted += val[i];
    }
    return formatted;
  };

  const boletoAmount = 54.90;

  const handleConfirmPin = (enteredPin: string) => {
    if (enteredPin.length === 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');

        const tx: Transaction = {
          id: `bol-${Date.now()}`,
          type: 'pix_transfer',
          recipientName: 'Claro Telecomunicações S.A.',
          recipientBank: 'Banco do Brasil S.A.',
          recipientCpf: '40.432.544/0001-47',
          amount: boletoAmount,
          date: new Date().toISOString(),
          formattedDate: 'Hoje',
          status: 'completed',
          message: `Pagamento de Boleto: ${digits.slice(0, 15)}...`,
        };

        onCompletePayment(boletoAmount, tx);
      }, 1500);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#000000] text-white flex flex-col animate-in fade-in duration-200">
      {/* Top Bar with back arrow & purple progress indicator */}
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Purple Progress bar */}
        <div className="w-full bg-[#1e1e24] h-1 rounded-full overflow-hidden mb-5">
          <div
            className="bg-[#820ad1] h-full transition-all duration-300"
            style={{
              width: step === 'input' ? '25%' : step === 'confirm' ? '60%' : '100%',
            }}
          />
        </div>
      </div>

      {step === 'input' && (
        <div className="flex-1 flex flex-col justify-between">
          {/* Main Top Area */}
          <div className="px-6 space-y-3">
            <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
              Digite o código do boleto que você quer pagar
            </h1>
            <p className="text-[14px] text-white/60 leading-relaxed">
              Os números deverão estar próximos ao código de barras
            </p>

            {/* Input display with underline */}
            <div className="pt-6 pb-2 border-b border-white/20 flex items-center justify-between">
              <div className="text-[18px] font-mono tracking-wide text-white min-h-[28px] overflow-hidden whitespace-nowrap">
                {digits ? (
                  formatBoletoDigits(digits)
                ) : (
                  <span className="text-white/20">00000.00000 00000.000000...</span>
                )}
              </div>
              <div className="text-[14px] text-white/50 font-medium pl-2 whitespace-nowrap">
                {digits.length}/47
              </div>
            </div>
          </div>

          {/* Bottom Area with Floating Purple Arrow & iOS Numpad */}
          <div>
            {/* Floating purple round button above keyboard */}
            <div className="flex justify-end px-6 pb-4">
              <button
                disabled={digits.length === 0}
                onClick={() => setStep('confirm')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  digits.length > 0
                    ? 'bg-[#820ad1] hover:bg-[#9216e8] active:scale-95 text-white shadow-lg cursor-pointer'
                    : 'bg-[#1c1c24] text-white/20 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* iOS Styled Numpad */}
            <div className="grid grid-cols-3 gap-2 px-6 pb-8 bg-[#0a0a0e] pt-3 border-t border-white/5">
              {[
                { n: '1', sub: '' },
                { n: '2', sub: 'ABC' },
                { n: '3', sub: 'DEF' },
                { n: '4', sub: 'GHI' },
                { n: '5', sub: 'JKL' },
                { n: '6', sub: 'MNO' },
                { n: '7', sub: 'PQRS' },
                { n: '8', sub: 'TUV' },
                { n: '9', sub: 'WXYZ' },
              ].map((item) => (
                <button
                  key={item.n}
                  onClick={() => handleKeyPress(item.n)}
                  className="h-14 rounded-xl bg-[#1a1a22] hover:bg-[#252530] active:scale-95 flex flex-col items-center justify-center transition-all text-white cursor-pointer"
                >
                  <span className="text-[20px] font-semibold leading-none">{item.n}</span>
                  {item.sub && (
                    <span className="text-[9px] text-white/40 tracking-widest font-semibold mt-0.5">
                      {item.sub}
                    </span>
                  )}
                </button>
              ))}
              <div />
              <button
                onClick={() => handleKeyPress('0')}
                className="h-14 rounded-xl bg-[#1a1a22] hover:bg-[#252530] active:scale-95 flex items-center justify-center transition-all text-white cursor-pointer"
              >
                <span className="text-[20px] font-semibold leading-none">0</span>
              </button>
              <button
                onClick={handleBackspace}
                className="h-14 rounded-xl bg-transparent hover:bg-white/5 active:scale-95 flex items-center justify-center transition-all text-white/80 cursor-pointer"
              >
                <Delete className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-10 animate-in fade-in duration-200">
          <div className="space-y-6">
            <h1 className="text-[24px] font-bold text-white tracking-tight">
              Boleto encontrado
            </h1>

            <div className="bg-[#16161c] rounded-2xl p-5 space-y-4 border border-white/5">
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-semibold">
                  Beneficiário
                </span>
                <p className="text-[16px] font-semibold text-white mt-0.5">
                  Claro Telecomunicações S.A.
                </p>
                <p className="text-[12px] text-white/60">CNPJ: 40.432.544/0001-47</p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-semibold">
                  Valor a pagar
                </span>
                <p className="text-[26px] font-bold text-white mt-0.5">R$ 54,90</p>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between">
                <div>
                  <span className="text-[12px] text-white/50">Vencimento</span>
                  <p className="text-[14px] font-medium text-white">25/09/2026</p>
                </div>
                <div className="text-right">
                  <span className="text-[12px] text-white/50">Pagando com</span>
                  <p className="text-[14px] font-medium text-white">Conta do Nubank</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setStep('pin')}
              className="w-full bg-[#820ad1] hover:bg-[#9216e8] active:scale-[0.98] text-white font-semibold py-4 rounded-full text-[16px] shadow-lg transition-all cursor-pointer"
            >
              Pagar boleto
            </button>
            <button
              onClick={() => setStep('input')}
              className="w-full py-3 text-center text-white/70 hover:text-white text-[14px] cursor-pointer"
            >
              Voltar
            </button>
          </div>
        </div>
      )}

      {step === 'pin' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-10 animate-in fade-in duration-200">
          <div className="space-y-6 pt-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#820ad1]/20 flex items-center justify-center mx-auto text-[#a855f7]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-white tracking-tight">
                Digite sua senha de 4 dígitos
              </h1>
              <p className="text-[13px] text-white/60 mt-1">
                Para autorizar o pagamento do boleto
              </p>
            </div>

            {/* 4 dots */}
            <div className="flex justify-center items-center gap-4 py-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all ${
                    pin.length > i ? 'bg-white scale-110' : 'border-2 border-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Numpad for PIN */}
          <div className="grid grid-cols-3 gap-2 pb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
              <button
                key={n}
                onClick={() => {
                  if (pin.length < 4) {
                    const next = pin + n;
                    setPin(next);
                    if (next.length === 4) handleConfirmPin(next);
                  }
                }}
                className="h-14 rounded-xl bg-[#1a1a22] hover:bg-[#252530] active:scale-95 flex items-center justify-center text-[20px] font-semibold text-white transition-all cursor-pointer"
              >
                {n}
              </button>
            ))}
            <div />
            <button
              onClick={() => {
                if (pin.length < 4) {
                  const next = pin + '0';
                  setPin(next);
                  if (next.length === 4) handleConfirmPin(next);
                }
              }}
              className="h-14 rounded-xl bg-[#1a1a22] hover:bg-[#252530] active:scale-95 flex items-center justify-center text-[20px] font-semibold text-white transition-all cursor-pointer"
            >
              0
            </button>
            <button
              onClick={() => setPin((p) => p.slice(0, -1))}
              className="h-14 rounded-xl bg-transparent hover:bg-white/5 active:scale-95 flex items-center justify-center text-white/80 transition-all cursor-pointer"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-12 pt-16 text-center animate-in zoom-in-95 duration-200">
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <div>
              <h1 className="text-[24px] font-bold text-white tracking-tight">
                Pagamento confirmado!
              </h1>
              <p className="text-[14px] text-white/60 mt-1">
                Boleto no valor de R$ 54,90 pago com sucesso.
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-white hover:bg-white/90 active:scale-[0.98] text-black font-semibold py-4 rounded-full text-[16px] transition-all cursor-pointer"
          >
            Voltar ao início
          </button>
        </div>
      )}
    </div>
  );
};
