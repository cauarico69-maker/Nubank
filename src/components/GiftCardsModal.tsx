import React, { useState } from 'react';
import { X, ShoppingCart, Lock, Smartphone, ChevronLeft, Check } from 'lucide-react';
import giftCardsBannerImg from '../assets/images/nubank_gift_cards_banner_1790003019519.jpg';

interface GiftCardsModalProps {
  onClose: () => void;
}

export const GiftCardsModal: React.FC<GiftCardsModalProps> = ({ onClose }) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = [
    { name: 'iFood', category: 'Delivery', discount: 'Até 5% de volta', color: '#EA1D2C' },
    { name: 'Uber', category: 'Transporte', discount: 'Cashback 4%', color: '#000000' },
    { name: 'Google Play', category: 'Apps & Jogos', discount: '3% off', color: '#01875F' },
    { name: 'PlayStation', category: 'Games', discount: '5% de volta', color: '#003791' },
    { name: 'Xbox', category: 'Games', discount: '5% de volta', color: '#107C10' },
    { name: 'Spotify', category: 'Música', discount: '3 meses', color: '#1DB954' },
  ];

  if (showCatalog) {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in pb-8">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCatalog(false)}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-[16px] font-bold text-white">Gift Cards</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-[20px] font-bold text-white">Escolha uma marca</h3>
            <p className="text-[13px] text-white/60">
              Descontos e vantagens exclusivas direto pelo NuPay.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {brands.map((b) => (
              <div
                key={b.name}
                onClick={() => setSelectedBrand(b.name)}
                className={`p-4 rounded-2xl bg-[#141418] border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                  selectedBrand === b.name
                    ? 'border-[#820AD1] ring-1 ring-[#820AD1]'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <h4 className="text-[15px] font-bold text-white">{b.name}</h4>
                  <p className="text-[11px] text-white/50">{b.category}</p>
                </div>
                <div className="text-[11px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md self-start">
                  {b.discount}
                </div>
              </div>
            ))}
          </div>

          {selectedBrand && (
            <div className="p-4 rounded-2xl bg-[#181820] border border-white/10 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Selecionado: {selectedBrand}</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Pronto para resgate
                </span>
              </div>
              <button
                onClick={() => {
                  alert(`Gift card do ${selectedBrand} ativado com sucesso!`);
                  onClose();
                }}
                className="w-full bg-[#820AD1] hover:bg-[#9214e6] font-bold text-xs py-3 rounded-full transition-all cursor-pointer text-center"
              >
                Comprar com NuPay
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in">
      {/* Top Media & Close */}
      <div className="relative w-full">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 active:scale-95 flex items-center justify-center transition-all cursor-pointer text-white"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="w-full h-56 overflow-hidden bg-[#240638]">
          <img
            src={giftCardsBannerImg}
            alt="Shopping do Nu Gift Cards"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Main Content (Matching Video 00:10 - 00:13) */}
      <div className="px-6 pt-5 pb-6 space-y-6 flex-1">
        <div className="space-y-2">
          <h2 className="text-[20px] font-bold text-white leading-tight">
            Gift Cards sem sair do app: o Shopping do Nu ainda mais completo
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Agora você pode comprar Gift Cards com descontos exclusivos direto pelo Nubank para usar
            onde você quiser.
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-6 pt-2">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-[#18181d] flex items-center justify-center shrink-0 mt-0.5">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[15px] font-bold text-white leading-snug">
                Uma vitrine cheia de opções
              </h4>
              <p className="text-[13px] text-white/60 leading-relaxed">
                São 50 opções com desconto em lojas, aplicativos de streaming, jogos online e
                serviços. Tem iFood, Google Play, Uber, Xbox, PlayStation e muito mais.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-[#18181d] flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[15px] font-bold text-white leading-snug">
                Segurança no pagamento
              </h4>
              <p className="text-[13px] text-white/60 leading-relaxed">
                O pagamento é feito por NuPay, no crédito ou débito, e você não precisa cadastrar
                seus dados em nenhum outro site para pagar.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-[#18181d] flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[15px] font-bold text-white leading-snug">
                Tudo em um só lugar
              </h4>
              <p className="text-[13px] text-white/60 leading-relaxed">
                Depois de pagar, as informações do seu Gift Card ficam sempre disponíveis no app do
                Nubank para você usar quando quiser ou presentear alguém.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-[#141418] border border-white/5 text-[12px] text-white/60 leading-relaxed">
          Podemos compartilhar seus dados pessoais com parceiros para prestar os serviços
          contratados, de acordo com a nossa{' '}
          <span className="text-purple-400 underline cursor-pointer">Política de Privacidade</span> e{' '}
          <span className="text-purple-400 underline cursor-pointer">
            Termos e Condições do Shopping do Nubank
          </span>
          .
        </div>
      </div>

      {/* Sticky Continue Button */}
      <div className="px-6 pb-8 pt-2 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={() => setShowCatalog(true)}
          className="w-full bg-[#820AD1] hover:bg-[#9214e6] active:scale-[0.99] text-white font-bold text-[15px] py-4 rounded-full transition-all cursor-pointer text-center shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
