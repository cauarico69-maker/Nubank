import React, { useState } from 'react';
import { X, Heart, Star, Check } from 'lucide-react';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-fade-in">
      <div className="w-full max-w-[390px] bg-[#141418] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 text-white space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-400 fill-purple-400" />
            <h3 className="text-[16px] font-bold">Avalie esta tela</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-[16px] font-bold text-white">Obrigado pela sua opinião!</h4>
            <p className="text-xs text-white/60">Sua avaliação nos ajuda a melhorar o Nubank.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-[13px] text-white/70">
              O que você achou das informações e da organização desta página?
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-2 text-2xl transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'text-[#a855f7] fill-[#a855f7]' : 'text-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              placeholder="Conte mais detalhes (opcional)..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-[#1e1e24] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-400 placeholder:text-white/30 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[#820AD1] hover:bg-[#9214e6] text-white font-bold text-xs py-3.5 rounded-full transition-all cursor-pointer text-center shadow-md"
            >
              Enviar avaliação
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
