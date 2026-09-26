import React, { useState } from 'react';
import { X, ChevronLeft, ArrowRight, Delete, Pencil, Check, ShieldCheck } from 'lucide-react';
import { UserAccount, Transaction } from '../types';
import { formatBRL } from '../utils/formatCurrency';

interface PhoneRechargeModalProps {
  user: UserAccount;
  onClose: () => void;
  onCompleteRecharge: (amount: number, tx: Transaction) => void;
}

export const PhoneRechargeModal: React.FC<PhoneRechargeModalProps> = ({
  user,
  onClose,
  onCompleteRecharge,
}) => {
  const [step, setStep] = useState<'phone' | 'operator' | 'amount' | 'review' | 'pin' | 'success'>('phone');
  const [rawPhone, setRawPhone] = useState('81994689968');
  const [operator, setOperator] = useState('Claro');
  const [amount, setAmount] = useState(20);
  const [hasReminder, setHasReminder] = useState(false);
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Phone formatting: (XX) XXXXX-XXXX
  const formatPhone = (digits: string) => {
    if (!digits) return '';
    const clean = digits.replace(/\D/g, '').slice(0, 11);
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  };

  const handlePhoneDigit = (d: string) => {
    if (rawPhone.length < 11) {
      setRawPhone((prev) => prev + d);
    }
  };

  const handlePhoneBackspace = () => {
    setRawPhone((prev) => prev.slice(0, -1));
  };

  const operators = ['Claro', 'TIM', 'Vivo', 'Correios'];
  const rechargeValues = [20, 25, 30, 35, 40, 50, 100];

  const handleConfirmPin = (enteredPin: string) => {
    if (enteredPin.length === 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');

        const tx: Transaction = {
          id: `rec-${Date.now()}`,
          type: 'pix_transfer',
          recipientName: `Recarga ${operator}`,
          recipientBank: 'Celular Pré-pago',
          recipientCpf: formatPhone(rawPhone),
          amount: amount,
          date: new Date().toISOString(),
          formattedDate: 'Hoje',
          status: 'completed',
          message: `Recarga de celular para ${formatPhone(rawPhone)} (${operator})`,
        };

        onCompleteRecharge(amount, tx);
      }, 1500);
    }
  };

  // Date formatted: dd/mm/yyyy
  const todayFormatted = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="absolute inset-0 z-50 bg-[#000000] text-white flex flex-col animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between mb-3">
          {step === 'phone' || step === 'review' || step === 'success' ? (
            <button
              onClick={onClose}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (step === 'operator') setStep('phone');
                if (step === 'amount') setStep('operator');
                if (step === 'pin') setStep('review');
              }}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>
          )}
        </div>

        {/* Purple Progress Bar */}
        {step !== 'success' && (
          <div className="w-full bg-[#1e1e24] h-1 rounded-full overflow-hidden mb-4">
            <div
              className="bg-[#820ad1] h-full transition-all duration-300"
              style={{
                width:
                  step === 'phone'
                    ? '20%'
                    : step === 'operator'
                    ? '40%'
                    : step === 'amount'
                    ? '65%'
                    : '100%',
              }}
            />
          </div>
        )}
      </div>

      {/* STEP 1: Phone number (Matches video 00:26-00:30) */}
      {step === 'phone' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="px-6 space-y-4">
            <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
              Qual número você quer recarregar?
            </h1>

            <div className="pt-4 pb-2 border-b border-white/20">
              <div className="text-[22px] font-semibold tracking-wide text-white min-h-[34px]">
                {rawPhone ? (
                  formatPhone(rawPhone)
                ) : (
                  <span className="text-white/30">(00) 00000-0000</span>
                )}
              </div>
            </div>
          </div>

          <div>
            {/* Floating purple round arrow */}
            <div className="flex justify-end px-6 pb-4">
              <button
                disabled={rawPhone.length < 10}
                onClick={() => setStep('operator')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  rawPhone.length >= 10
                    ? 'bg-[#820ad1] hover:bg-[#9216e8] active:scale-95 text-white shadow-lg cursor-pointer'
                    : 'bg-[#1c1c24] text-white/20 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* iOS Numpad */}
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
                  onClick={() => handlePhoneDigit(item.n)}
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
              <div className="h-14 rounded-xl bg-transparent flex items-center justify-center text-white/40 font-semibold text-[15px]">
                + * #
              </div>
              <button
                onClick={() => handlePhoneDigit('0')}
                className="h-14 rounded-xl bg-[#1a1a22] hover:bg-[#252530] active:scale-95 flex items-center justify-center transition-all text-white cursor-pointer"
              >
                <span className="text-[20px] font-semibold leading-none">0</span>
              </button>
              <button
                onClick={handlePhoneBackspace}
                className="h-14 rounded-xl bg-transparent hover:bg-white/5 active:scale-95 flex items-center justify-center transition-all text-white/80 cursor-pointer"
              >
                <Delete className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Operator selection (Matches video 00:31-00:32) */}
      {step === 'operator' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-10">
          <div className="space-y-4">
            <h1 className="text-[24px] font-bold text-white tracking-tight">
              Qual é a operadora?
            </h1>
            <p className="text-[14px] text-white/70">{formatPhone(rawPhone)}</p>

            <div className="pt-2 space-y-2">
              {operators.map((op) => {
                const isSelected = operator === op;
                return (
                  <div
                    key={op}
                    onClick={() => setOperator(op)}
                    className="py-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 px-3 -mx-3 rounded-xl transition-all"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#820ad1] bg-[#820ad1]'
                          : 'border-white/40'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-[16px] font-medium text-white">{op}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep('amount')}
              className="w-12 h-12 rounded-full bg-[#820ad1] hover:bg-[#9216e8] active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              <ArrowRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Amount selection (Matches video 00:35-00:37) */}
      {step === 'amount' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-10">
          <div className="space-y-4">
            <h1 className="text-[24px] font-bold text-white tracking-tight">
              Qual é o valor da recarga?
            </h1>
            <p className="text-[14px] text-white/60">
              Saldo disponível: R$ {formatBRL(user.balance)}
            </p>

            <div className="pt-2 space-y-2 max-h-[420px] overflow-y-auto no-scrollbar">
              {rechargeValues.map((val) => {
                const isSelected = amount === val;
                return (
                  <div
                    key={val}
                    onClick={() => setAmount(val)}
                    className="py-3.5 flex items-center gap-4 cursor-pointer hover:bg-white/5 px-3 -mx-3 rounded-xl transition-all"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#820ad1] bg-[#820ad1]'
                          : 'border-white/40'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-[16px] font-medium text-white">
                      R$ {formatBRL(val)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep('review')}
              className="w-12 h-12 rounded-full bg-[#820ad1] hover:bg-[#9216e8] active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              <ArrowRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review screen (Matches video 00:38-00:40) */}
      {step === 'review' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-10 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">
                Você está recarregando
              </h1>
              <div
                onClick={() => setStep('amount')}
                className="flex items-center gap-2 mt-2 cursor-pointer group w-fit"
              >
                <span className="text-[32px] font-bold text-[#a855f7] tracking-tight">
                  R$ {formatBRL(amount)}
                </span>
                <Pencil className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {/* Número */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-white/50 block">Número</span>
                  <span className="text-[15px] font-medium text-white">
                    {formatPhone(rawPhone)}
                  </span>
                </div>
                <button
                  onClick={() => setStep('phone')}
                  className="text-[13px] font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Alterar
                </button>
              </div>

              {/* Operadora */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-white/50 block">Operadora</span>
                  <span className="text-[15px] font-medium text-white">{operator}</span>
                </div>
                <button
                  onClick={() => setStep('operator')}
                  className="text-[13px] font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Alterar
                </button>
              </div>

              {/* Pagando com */}
              <div className="py-4">
                <span className="text-[12px] text-white/50 block">Pagando com</span>
                <span className="text-[15px] font-medium text-white">Conta do Nubank</span>
              </div>

              {/* Data da recarga */}
              <div className="py-4">
                <span className="text-[12px] text-white/50 block">Data da recarga</span>
                <span className="text-[15px] font-medium text-white">{todayFormatted}</span>
              </div>

              {/* Lembrete de recarga */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <span className="text-[15px] font-medium text-white block">
                    Lembrete de recarga
                  </span>
                  <span className="text-[12px] text-white/50 block">
                    Crie um lembrete para essa recarga
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasReminder(!hasReminder)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                    hasReminder ? 'bg-[#820ad1]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      hasReminder ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep('pin')}
            className="w-full bg-[#820ad1] hover:bg-[#9216e8] active:scale-[0.98] text-white font-semibold py-4 rounded-full text-[16px] shadow-lg transition-all cursor-pointer"
          >
            Confirmar pagamento
          </button>
        </div>
      )}

      {/* STEP 5: 4-digit PIN */}
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
                Para confirmar a recarga de R$ {formatBRL(amount)}
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

      {/* STEP 6: Success receipt */}
      {step === 'success' && (
        <div className="flex-1 flex flex-col justify-between px-6 pb-12 pt-16 text-center animate-in zoom-in-95 duration-200">
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <div>
              <h1 className="text-[24px] font-bold text-white tracking-tight">
                Recarga realizada!
              </h1>
              <p className="text-[14px] text-white/60 mt-1">
                R$ {formatBRL(amount)} para {formatPhone(rawPhone)} ({operator})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-white hover:bg-white/90 active:scale-[0.98] text-black font-semibold py-4 rounded-full text-[16px] transition-all cursor-pointer"
          >
            Voltar ao início
          </button>
        </div>
      )}
    </div>
  );
};
