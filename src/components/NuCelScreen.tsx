import React, { useState } from 'react';
import { NUCEL_BENEFITS } from '../data/mockData';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

interface NuCelScreenProps {
  onSelectPlan?: () => void;
}

export const NuCelScreen: React.FC<NuCelScreenProps> = () => {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [showPlansModal, setShowPlansModal] = useState(false);

  return (
    <div className="flex-1 bg-[#000000] text-white pb-28 select-none overflow-y-auto">
      {/* Top Purple Hero Section */}
      <div className="bg-[#820AD1] px-6 pt-3 pb-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold tracking-tight">NuCel</h2>
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            5G
          </span>
        </div>

        <p className="text-[15px] text-white/90 leading-snug max-w-[290px] mb-6">
          O plano de celular com benefícios que só o Nubank pode oferecer
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-white/80 block">A partir de</span>
            <div className="text-2xl font-black tracking-tight">
              R$ 30<span className="text-xs font-normal text-white/70">/mês</span>
            </div>
          </div>

          <button
            onClick={() => setShowPlansModal(true)}
            className="bg-[#121214] hover:bg-[#202024] active:scale-95 text-white text-xs font-bold py-3 px-5 rounded-full transition-all cursor-pointer shadow-md"
          >
            Conhecer planos
          </button>
        </div>
      </div>

      {/* Feature Cards List */}
      <div className="px-5 pt-6 space-y-4">
        {NUCEL_BENEFITS.map((benefit) => (
          <div
            key={benefit.id}
            className="w-full bg-[#17171b] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/15 transition-all cursor-pointer active:scale-[0.99]"
            onClick={() => setShowPlansModal(true)}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#24133b] shrink-0">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-medium text-white/90 leading-snug flex-1">
              {benefit.title}
            </p>
          </div>
        ))}
      </div>

      {/* Plans Selection Modal */}
      {showPlansModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#1a1a1f] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 text-white max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#820AD1]" />
                <h3 className="text-base font-bold">Planos NuCel</h3>
              </div>
              <button
                onClick={() => setShowPlansModal(false)}
                className="text-white/60 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 py-4">
              {[
                { name: 'NuCel 15GB', gigas: '15 GB', price: '30,00', bonus: '+ WhatsApp Ilimitado' },
                { name: 'NuCel 20GB', gigas: '20 GB', price: '45,00', bonus: '+ WhatsApp + Voz Ilimitada' },
                { name: 'NuCel 35GB', gigas: '35 GB', price: '65,00', bonus: '+ WhatsApp + 120% CDI na Caixinha' },
              ].map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setActivePlan(plan.name)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activePlan === plan.name
                      ? 'border-[#820AD1] bg-[#820AD1]/15'
                      : 'border-white/10 bg-[#121215] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{plan.name}</div>
                    <div className="text-xs text-purple-300">{plan.bonus}</div>
                    <div className="text-xs text-white/50 mt-1">Sem fidelidade, cancele quando quiser</div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-white">R$ {plan.price}</span>
                    <span className="text-[10px] text-white/60 block">/mês</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                alert('Plano NuCel contratado com sucesso!');
                setShowPlansModal(false);
              }}
              disabled={!activePlan}
              className="w-full bg-[#820AD1] disabled:opacity-40 hover:bg-[#9312eb] active:scale-98 text-white font-bold text-sm py-3.5 rounded-full transition-all cursor-pointer"
            >
              {activePlan ? `Contratar ${activePlan}` : 'Selecione um plano'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
