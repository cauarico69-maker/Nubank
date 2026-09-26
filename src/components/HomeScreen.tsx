import React, { useState } from 'react';
import { ChevronRight, CreditCard, Heart, Plus } from 'lucide-react';
import { UserAccount, Caixinha } from '../types';
import { PixIcon, BarcodeIcon, QrCodeNuIcon, PhoneNuIcon, NuLogo } from './NuLogo';
import { formatBRL } from '../utils/formatCurrency';
import duolingoBannerImg from '../assets/images/duolingo_nubank_banner_1790001933459.jpg';
import focarCarreiraImg from '../assets/images/focar_carreira_phone_1790000181503.jpg';

interface HomeScreenProps {
  user: UserAccount;
  caixinhas: Caixinha[];
  onOpenPixArea: () => void;
  onOpenAccountDetails: () => void;
  onOpenPixScanner: () => void;
  onOpenCards: () => void;
  onOpenCaixinhas: () => void;
  onOpenPaymentOptions: () => void;
  onOpenPhoneRecharge: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  caixinhas,
  onOpenPixArea,
  onOpenAccountDetails,
  onOpenPixScanner,
  onOpenCards,
  onOpenCaixinhas,
  onOpenPaymentOptions,
  onOpenPhoneRecharge,
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  return (
    <div className="flex-1 bg-[#000000] text-white px-5 pt-5 pb-28 space-y-6 select-none overflow-y-auto no-scrollbar">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#25252b] border border-white/10 text-white text-xs px-4 py-2 rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#820AD1]" />
          {showToast}
        </div>
      )}

      {/* Saldo em conta (Clicking opens Account Details & Extract like in video 00:46) */}
      <div
        onClick={onOpenAccountDetails}
        className="cursor-pointer group active:opacity-80 transition-opacity"
      >
        <div className="flex items-center justify-between text-[#efefef] font-medium text-[15px] mb-1.5">
          <span>Saldo em conta</span>
          <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <div className="text-[22px] font-bold tracking-tight text-white">
          {user.isBalanceVisible ? (
            `R$ ${formatBRL(user.balance, user.customBalanceDisplay)}`
          ) : (
            <span className="tracking-widest text-white/70 text-base font-normal">••••</span>
          )}
        </div>
      </div>

      {/* Row of Quick Actions (Matching Image 1) */}
      <div className="grid grid-cols-4 gap-2 py-1 w-full">
        {/* 1. Área Pix e Transferir */}
        <button
          onClick={onOpenPixArea}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-[62px] h-[62px] rounded-full bg-[#1b1b22] hover:bg-[#282830] active:scale-95 flex items-center justify-center transition-all duration-150 shadow-sm">
            <PixIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[12px] font-medium text-center text-white/95 leading-tight">
            Área Pix e<br />Transferir
          </span>
        </button>

        {/* 2. Pagar */}
        <button
          onClick={onOpenPaymentOptions}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-[62px] h-[62px] rounded-full bg-[#1b1b22] hover:bg-[#282830] active:scale-95 flex items-center justify-center transition-all duration-150 shadow-sm">
            <BarcodeIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[12px] font-medium text-center text-white/95 leading-tight">
            Pagar
          </span>
        </button>

        {/* 3. Pagar com Pix QR code */}
        <button
          onClick={onOpenPixScanner}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-[62px] h-[62px] rounded-full bg-[#1b1b22] hover:bg-[#282830] active:scale-95 flex items-center justify-center transition-all duration-150 shadow-sm">
            <QrCodeNuIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[12px] font-medium text-center text-white/95 leading-tight">
            Pagar com<br />Pix QR code
          </span>
        </button>

        {/* 4. Recarga de celular */}
        <button
          onClick={onOpenPhoneRecharge}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-[62px] h-[62px] rounded-full bg-[#1b1b22] hover:bg-[#282830] active:scale-95 flex items-center justify-center transition-all duration-150 shadow-sm">
            <PhoneNuIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[12px] font-medium text-center text-white/95 leading-tight">
            Recarga de<br />celular
          </span>
        </button>
      </div>

      {/* Meus Cartões */}
      <button
        onClick={onOpenCards}
        className="w-full bg-[#1c1c20] hover:bg-[#25252b] active:scale-[0.99] rounded-2xl p-4 flex items-center gap-3 transition-all cursor-pointer text-left"
      >
        <CreditCard className="w-5 h-5 text-white stroke-[1.8]" />
        <span className="text-[13px] font-semibold text-white">Meus cartões</span>
      </button>

      {/* Cartão de Crédito */}
      <div
        onClick={onOpenCards}
        className="cursor-pointer group active:opacity-80 transition-opacity space-y-1 pt-1"
      >
        <div className="flex items-center justify-between text-[#efefef] font-medium text-[15px]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-white/70" />
            <span>Cartão de crédito</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <div className="text-[13px] text-white/60">Fatura atual</div>
        <div className="text-[20px] font-bold tracking-tight text-white">
          {user.isBalanceVisible ? (
            `R$ ${formatBRL(user.creditCardInvoice ?? 180.4)}`
          ) : (
            <span className="tracking-widest text-white/50 text-base font-normal">••••••</span>
          )}
        </div>
        <div className="text-[12px] text-white/60">
          Limite disponível{' '}
          <span className="text-emerald-400 font-semibold">
            {user.isBalanceVisible
              ? `R$ ${formatBRL(user.creditCardLimit ?? 825.36)}`
              : '••••'}
          </span>
        </div>
      </div>

      {/* Promo Banner: Duolingo e Nubank juntos (Matching Image 1) */}
      <div className="space-y-2.5 pt-1">
        <h3 className="text-[14px] font-semibold text-white">Duolingo e Nubank juntos</h3>
        <div className="relative w-full rounded-3xl bg-[#370659] border border-purple-500/20 overflow-hidden min-h-[148px] shadow-lg flex items-center">
          {/* Background image on the right half with smooth gradient blend */}
          <div className="absolute top-0 right-0 bottom-0 w-[62%] overflow-hidden pointer-events-none">
            <img
              src={duolingoBannerImg}
              alt="Duolingo e Nubank juntos"
              className="w-full h-full object-cover object-center"
            />
            {/* Linear gradient fade from dark purple to make text completely readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#370659] via-[#370659]/80 to-transparent w-[55%]" />
          </div>

          {/* Left content: text & dark button */}
          <div className="relative z-10 p-5 max-w-[175px] space-y-3.5">
            <h4 className="text-[16px] font-bold text-white leading-snug tracking-tight">
              3 meses de<br />Super Duolingo<br />grátis
            </h4>
            <button
              onClick={() => triggerToast('Benefício Super Duolingo ativado!')}
              className="bg-[#18181c] hover:bg-[#25252b] active:scale-95 text-white text-[13px] font-semibold py-2 px-5 rounded-full transition-all cursor-pointer shadow-md inline-block"
            >
              Eu quero
            </button>
          </div>
        </div>
      </div>

      {/* Total em Caixinhas (Matching Image 2) */}
      <div className="space-y-3 pt-1">
        <div
          onClick={onOpenCaixinhas}
          className="flex items-center justify-between cursor-pointer group"
        >
          <div>
            <h3 className="text-[14px] font-semibold text-white">Total em Caixinhas</h3>
            <p className="text-[17px] font-bold text-white mt-0.5">
              {user.isBalanceVisible
                ? `R$ ${formatBRL(caixinhas.reduce((acc, c) => acc + c.amount, 0))}`
                : '••••'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Horizontal Tiles matching Image 2 */}
        <div className="flex items-start gap-3 overflow-x-auto no-scrollbar py-1">
          {/* Tile 1: Focar na carreira */}
          <div
            onClick={onOpenCaixinhas}
            className="flex flex-col gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-[104px] h-[104px] rounded-2xl overflow-hidden border border-[#1a2936] bg-[#121215] shadow-sm group-hover:border-white/20 transition-all">
              <img
                src={focarCarreiraImg}
                alt="Focar na carreira"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="space-y-0.5 pl-0.5">
              <p className="text-[13px] font-medium text-white leading-tight">
                Focar na carreira
              </p>
              <p className="text-[13px] text-white/80 font-normal">
                {user.isBalanceVisible ? 'R$ 0,00' : '••••'}
              </p>
            </div>
          </div>

          {/* Tile 2: Criar caixinha */}
          <div
            onClick={onOpenCaixinhas}
            className="flex flex-col gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-[104px] h-[104px] rounded-2xl bg-[#092238] hover:bg-[#0c2b47] active:scale-95 flex items-center justify-center transition-all shadow-sm">
              <Plus className="w-8 h-8 text-[#0284c7] stroke-[2.5]" />
            </div>
            <div className="pl-0.5">
              <p className="text-[13px] font-medium text-white leading-tight">
                Criar caixinha
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compre sem sair do app: Gift cards (Matching Image 4) */}
      <div className="space-y-2.5 pt-1">
        <h3 className="text-[14px] font-semibold text-white/90">Compre sem sair do app</h3>
        <div className="w-full rounded-3xl bg-[#26053f] border border-purple-500/20 p-5 flex items-center justify-between relative overflow-hidden shadow-md">
          <div className="max-w-[185px] z-10 space-y-3.5">
            <p className="text-[14px] font-bold text-white leading-snug">
              Gift cards para você comprar as marcas que mais curte
            </p>
            <button
              onClick={() => triggerToast('Catálogo de Gift Cards')}
              className="bg-[#820AD1] hover:bg-[#9214e6] active:scale-95 text-white text-[13px] font-bold py-2.5 px-6 rounded-full transition-all cursor-pointer shadow-md inline-block"
            >
              Conhecer
            </button>
          </div>

          {/* Overlapping Nu cards illustration matching Image 4 */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            {/* Back card */}
            <div className="w-16 h-11 rounded-lg bg-[#530882] rotate-12 absolute shadow-md border border-white/10" />
            {/* Front card */}
            <div className="w-16 h-11 rounded-lg bg-[#820AD1] -rotate-6 absolute shadow-lg border border-white/20 flex items-center justify-center">
              <NuLogo className="w-6 h-3.5 text-white" color="#FFFFFF" />
            </div>
          </div>
        </div>
      </div>

      {/* Descubra mais (Matching Image 5) */}
      <div className="space-y-2.5 pt-1">
        <h3 className="text-[14px] font-semibold text-white/90">Descubra mais</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {/* Card 1: Indique amigos (Matching Image 5) */}
          <div className="min-w-[240px] w-[240px] rounded-3xl bg-[#16161a] border border-white/5 overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="h-32 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                alt="Indique o Nu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between space-y-3.5">
              <div>
                <h4 className="text-[14px] font-bold text-white mb-1">Indique o Nu para amigos</h4>
                <p className="text-[12px] text-white/60 leading-normal">
                  Espalhe como é simples estar no controle.
                </p>
              </div>
              <button
                onClick={() => triggerToast('Link de convite copiado!')}
                className="bg-[#820AD1] hover:bg-[#9214e6] active:scale-95 text-white text-[12px] font-bold py-2.5 px-5 rounded-full transition-all cursor-pointer self-start"
              >
                Indicar amigos
              </button>
            </div>
          </div>

          {/* Card 2: Portabilidade de salário (Matching Image 5) */}
          <div className="min-w-[240px] w-[240px] rounded-3xl bg-[#16161a] border border-white/5 overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="h-32 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80"
                alt="Portabilidade de salário"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between space-y-3.5">
              <div>
                <h4 className="text-[14px] font-bold text-white mb-1">Portabilidade de salário</h4>
                <p className="text-[12px] text-white/60 leading-normal">
                  Liberdade é escolher onde receber seu dinheiro.
                </p>
              </div>
              <button
                onClick={() => triggerToast('Portabilidade de salário')}
                className="bg-[#820AD1] hover:bg-[#9214e6] active:scale-95 text-white text-[12px] font-bold py-2.5 px-5 rounded-full transition-all cursor-pointer self-start"
              >
                Conhecer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Avalie esta tela */}
      <div className="pt-2 pb-4 flex justify-center">
        <button
          onClick={() => setHasLiked(!hasLiked)}
          className="flex items-center gap-2 text-[12px] font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-purple-400 text-purple-400' : 'text-purple-400'}`} />
          <span>Avalie esta tela</span>
        </button>
      </div>
    </div>
  );
};
