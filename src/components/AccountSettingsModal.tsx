import React, { useState } from 'react';
import { X, Check, Camera, DollarSign, CreditCard, Shield, RotateCcw } from 'lucide-react';
import { UserAccount, Caixinha } from '../types';
import { formatBRL } from '../utils/formatCurrency';

interface AccountSettingsModalProps {
  user: UserAccount;
  caixinhas: Caixinha[];
  onClose: () => void;
  onSave: (updatedUser: UserAccount, updatedCaixinhas: Caixinha[]) => void;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  user,
  caixinhas,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(user.name);
  const [fullName, setFullName] = useState(user.fullName || 'Cauã Souza Barros');
  const [balance, setBalance] = useState(formatBRL(user.balance));
  const [profilePhoto, setProfilePhoto] = useState(
    user.profilePhoto ||
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80'
  );
  const [agency, setAgency] = useState(user.agency);
  const [accountNumber, setAccountNumber] = useState(user.accountNumber);

  // Caixinhas
  const [caixinhaAmount, setCaixinhaAmount] = useState(
    formatBRL(caixinhas[0]?.amount ?? 0)
  );
  const [caixinhaName, setCaixinhaName] = useState(caixinhas[0]?.name ?? 'Focar na carreira');

  // Credit Card
  const [creditCardInvoice, setCreditCardInvoice] = useState(
    formatBRL(user.creditCardInvoice ?? 180.4)
  );
  const [creditCardLimit, setCreditCardLimit] = useState(
    formatBRL(user.creditCardLimit ?? 825.36)
  );
  const [printedCardName, setPrintedCardName] = useState(
    user.printedCardName || 'CAUA SOUZA BARROS'
  );
  const [cardLastDigits, setCardLastDigits] = useState(user.cardLastDigits || '0082');
  const [cardVirtualDigits, setCardVirtualDigits] = useState(user.cardVirtualDigits || '6504');
  const [cardExpiry, setCardExpiry] = useState(user.cardExpiry || '07/33');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Photo Upload helper
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfilePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const parsedBalance = parseFloat(balance.replace(/\./g, '').replace(',', '.')) || 0;
    const parsedCaixinha = parseFloat(caixinhaAmount.replace(/\./g, '').replace(',', '.')) || 0;
    const parsedInvoice =
      parseFloat(creditCardInvoice.replace(/\./g, '').replace(',', '.')) || 0;
    const parsedLimit = parseFloat(creditCardLimit.replace(/\./g, '').replace(',', '.')) || 0;

    const updatedUser: UserAccount = {
      ...user,
      name: name.trim() || 'Cauã',
      fullName: fullName.trim() || 'Cauã Souza Barros',
      printedCardName: printedCardName.trim().toUpperCase() || 'CAUA SOUZA BARROS',
      profilePhoto,
      balance: parsedBalance,
      customBalanceDisplay: balance.trim(),
      agency: agency.trim() || '0001',
      accountNumber: accountNumber.trim() || '381930957-8',
      totalCaixinhas: parsedCaixinha,
      creditCardInvoice: parsedInvoice,
      creditCardLimit: parsedLimit,
      cardLastDigits: cardLastDigits.trim() || '0082',
      cardVirtualDigits: cardVirtualDigits.trim() || '6504',
      cardExpiry: cardExpiry.trim() || '07/33',
    };

    const updatedCaixinhas = caixinhas.map((c, i) =>
      i === 0
        ? {
            ...c,
            name: caixinhaName,
            amount: parsedCaixinha,
            customAmountDisplay: caixinhaAmount.trim(),
          }
        : c
    );

    onSave(updatedUser, updatedCaixinhas);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetDefaults = () => {
    setName('Cauã');
    setFullName('Cauã Souza Barros');
    setBalance('61,11');
    setCaixinhaAmount('50.731,22');
    setCaixinhaName('Focar na carreira');
    setCreditCardInvoice('180,40');
    setCreditCardLimit('825,36');
    setPrintedCardName('CAUA SOUZA BARROS');
    setCardLastDigits('0082');
    setCardVirtualDigits('6504');
    setCardExpiry('07/33');
    setProfilePhoto(
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto p-5 animate-fade-in select-none">
      <div className="space-y-6 pb-20">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-[17px] font-bold text-white">Configurações</h2>
          </div>

          <button
            onClick={handleResetDefaults}
            title="Restaurar padrão"
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Padrão</span>
          </button>
        </div>

        {/* Profile Photo Section */}
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#820AD1] shrink-0 bg-neutral-800">
            <img src={profilePhoto} alt={name} className="w-full h-full object-cover" />
            <label
              htmlFor="photo-upload"
              className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Camera className="w-5 h-5 text-white drop-shadow" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white">Foto de Perfil</h3>
            <input
              type="text"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#1c1c22] text-xs text-white/90 px-2.5 py-1.5 rounded-lg mt-2 border border-white/10 focus:outline-none focus:border-[#820AD1]"
            />
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#a855f7] uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Dados da Conta</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Nome (Saudação)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Cauã"
                className="w-full bg-[#1c1c22] text-sm text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
              />
            </div>

            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Cauã Souza Barros"
                className="w-full bg-[#1c1c22] text-sm text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">Agência</label>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-[#1c1c22] text-sm text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Número da Conta
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-[#1c1c22] text-sm text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
              />
            </div>
          </div>
        </div>

        {/* Saldos da Conta e Caixinha */}
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Saldos e Valores</span>
          </div>

          <div>
            <label className="text-[11px] text-white/60 font-medium block mb-1">
              Saldo em Conta (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-white/50">
                R$
              </span>
              <input
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="61,11"
                className="w-full bg-[#1c1c22] text-base font-bold text-white pl-10 pr-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Nome da Caixinha
              </label>
              <input
                type="text"
                value={caixinhaName}
                onChange={(e) => setCaixinhaName(e.target.value)}
                placeholder="Focar na carreira"
                className="w-full bg-[#1c1c22] text-sm text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Saldo da Caixinha (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-white/50">
                  R$
                </span>
                <input
                  type="text"
                  value={caixinhaAmount}
                  onChange={(e) => setCaixinhaAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-[#1c1c22] text-sm font-bold text-white pl-10 pr-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cartão de Crédito e Cartão Físico */}
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Cartão de Crédito & Físico</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Fatura Atual (R$)
              </label>
              <input
                type="text"
                value={creditCardInvoice}
                onChange={(e) => setCreditCardInvoice(e.target.value)}
                placeholder="180,40"
                className="w-full bg-[#1c1c22] text-sm font-bold text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1]"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/60 font-medium block mb-1">
                Limite Disponível (R$)
              </label>
              <input
                type="text"
                value={creditCardLimit}
                onChange={(e) => setCreditCardLimit(e.target.value)}
                placeholder="825,36"
                className="w-full bg-[#1c1c22] text-sm font-bold text-emerald-400 px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-white/60 font-medium block mb-1">
              Nome Impresso no Cartão
            </label>
            <input
              type="text"
              value={printedCardName}
              onChange={(e) => setPrintedCardName(e.target.value.toUpperCase())}
              placeholder="CAUA SOUZA BARROS"
              className="w-full bg-[#1c1c22] text-sm font-mono tracking-wider text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#820AD1] uppercase"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-white/60 font-medium block mb-1">
                Final Físico
              </label>
              <input
                type="text"
                maxLength={4}
                value={cardLastDigits}
                onChange={(e) => setCardLastDigits(e.target.value)}
                placeholder="0082"
                className="w-full bg-[#1c1c22] text-xs font-mono text-center text-white px-2 py-2 rounded-xl border border-white/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/60 font-medium block mb-1">
                Final Virtual
              </label>
              <input
                type="text"
                maxLength={4}
                value={cardVirtualDigits}
                onChange={(e) => setCardVirtualDigits(e.target.value)}
                placeholder="6504"
                className="w-full bg-[#1c1c22] text-xs font-mono text-center text-white px-2 py-2 rounded-xl border border-white/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/60 font-medium block mb-1">Validade</label>
              <input
                type="text"
                maxLength={5}
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                placeholder="07/33"
                className="w-full bg-[#1c1c22] text-xs font-mono text-center text-white px-2 py-2 rounded-xl border border-white/10 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Action Button */}
      <div className="sticky bottom-0 left-0 right-0 pt-3 pb-2 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
            savedSuccess
              ? 'bg-emerald-500 text-white'
              : 'bg-[#820AD1] hover:bg-[#9413ec] active:scale-98 text-white'
          }`}
        >
          {savedSuccess ? (
            <>
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Alterações Salvas com Sucesso!</span>
            </>
          ) : (
            <span>Salvar Alterações</span>
          )}
        </button>
      </div>
    </div>
  );
};
