import React, { useState } from 'react';
import { ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SalaryPortabilityModalProps {
  onBack: () => void;
  onComplete?: () => void;
}

export const SalaryPortabilityModal: React.FC<SalaryPortabilityModalProps> = ({
  onBack,
  onComplete,
}) => {
  const [cnpj, setCnpj] = useState('');
  const [step, setStep] = useState<'input' | 'success'>('input');

  // Format CNPJ input with mask: 00.000.000 (first 8 digits)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5)}`;
    } else if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}.${raw.slice(2)}`;
    }
    setCnpj(formatted);
  };

  const rawDigits = cnpj.replace(/\D/g, '');
  const isValid = rawDigits.length === 8;

  const handleNext = () => {
    if (!isValid) return;
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-6 select-none animate-fade-in">
        <div className="flex items-center justify-between pb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-[#820AD1]">
            <CheckCircle2 className="w-10 h-10 text-[#a855f7]" />
          </div>
          <h2 className="text-[22px] font-bold text-white">Solicitação enviada!</h2>
          <p className="text-[14px] text-white/70 max-w-[280px] leading-relaxed">
            Estamos verificando os dados do CNPJ <span className="text-white font-semibold">{cnpj}</span> com seu banco de origem. Em até 10 dias úteis o seu salário começará a cair direto no Nubank.
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-full bg-[#820AD1] hover:bg-[#9214e6] text-white font-bold text-[15px] py-4 rounded-full transition-all cursor-pointer text-center"
        >
          Entendi
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-6 select-none animate-fade-in">
      <div className="space-y-6">
        {/* Header with Back Arrow */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-[22px] font-bold text-white leading-tight">
          Insira o CNPJ da empresa onde você trabalha
        </h2>

        {/* Masked Input */}
        <div className="space-y-2 pt-2">
          <input
            type="text"
            inputMode="numeric"
            value={cnpj}
            onChange={handleInputChange}
            placeholder="00.000.000"
            autoFocus
            className="w-full bg-transparent border-b border-white/20 focus:border-purple-400 py-3 text-[26px] font-semibold text-white tracking-wider placeholder:text-white/25 focus:outline-none"
          />
          <p className="text-[13px] text-white/60">
            Só precisamos dos 8 primeiros dígitos do CNPJ
          </p>
        </div>

        {/* Gray Tip Card (Matching Video 00:20) */}
        <div className="p-4 rounded-2xl bg-[#18181d] border border-white/5 text-[13px] text-white/70 leading-relaxed">
          Encontre o CNPJ no seu holerite, carteira de trabalho ou contracheque. Mecanismos de busca
          podem retornar o número incorreto.
        </div>
      </div>

      {/* Floating Bottom Right Arrow Button (Matching Video 00:20) */}
      <div className="flex justify-end pb-4 pt-2">
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
            isValid
              ? 'bg-[#820AD1] hover:bg-[#9214e6] text-white active:scale-95'
              : 'bg-[#202026] text-white/30 cursor-not-allowed'
          }`}
        >
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
