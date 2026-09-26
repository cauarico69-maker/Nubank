import React, { useState } from 'react';
import { IPhoneFrame } from './components/IPhoneFrame';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { NuCelScreen } from './components/NuCelScreen';
import { FloatingDock } from './components/FloatingDock';
import { ProfileDrawer } from './components/ProfileDrawer';
import { HelpScreen } from './components/HelpScreen';
import { ProtectionCenterScreen } from './components/ProtectionCenterScreen';
import { PixAreaScreen } from './components/PixAreaScreen';
import { PixTransferFlow } from './components/PixTransferFlow';
import { PixAgendadoIntro } from './components/PixAgendadoIntro';
import { PixScannerScreen } from './components/PixScannerScreen';
import { PixCopiaColaScreen } from './components/PixCopiaColaScreen';
import { CaixinhasScreen } from './components/CaixinhasScreen';
import { MeusCartoesModal } from './components/MeusCartoesModal';
import { AccountDetailsScreen } from './components/AccountDetailsScreen';
import { AccountSettingsModal } from './components/AccountSettingsModal';
import { PaymentOptionsModal } from './components/PaymentOptionsModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { BoletoManualInputModal } from './components/BoletoManualInputModal';
import { PhoneRechargeModal } from './components/PhoneRechargeModal';
import { INITIAL_USER, MOCK_CAIXINHAS, MOCK_ACCOUNT_HISTORY } from './data/mockData';
import { Caixinha, Transaction, UserAccount, HistoryTransaction } from './types';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'nucel'>('home');
  const [activeModal, setActiveModal] = useState<
    | null
    | 'profile'
    | 'settings'
    | 'help'
    | 'protection_center'
    | 'account_details'
    | 'pix_area'
    | 'pix_transfer'
    | 'pix_agendado_intro'
    | 'pix_scanner'
    | 'pix_copia_cola'
    | 'caixinhas'
    | 'meus_cartoes'
    | 'payment_options'
    | 'barcode_scanner'
    | 'boleto_manual'
    | 'phone_recharge'
  >(null);

  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('nu_custom_user');
      if (saved) {
        return { ...INITIAL_USER, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return INITIAL_USER;
  });

  const [caixinhas, setCaixinhas] = useState<Caixinha[]>(() => {
    try {
      const saved = localStorage.getItem('nu_custom_caixinhas');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return MOCK_CAIXINHAS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accountHistory, setAccountHistory] = useState<HistoryTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('nu_account_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((tx: HistoryTransaction) => tx.dateGroup !== 'Hoje');
          localStorage.setItem('nu_account_history', JSON.stringify(filtered));
          return filtered;
        }
      }
    } catch {
      // ignore
    }
    return MOCK_ACCOUNT_HISTORY.filter((tx) => tx.dateGroup !== 'Hoje');
  });

  // Toggles & Handlers
  const handleToggleBalanceVisibility = () => {
    setUser((prev) => ({ ...prev, isBalanceVisible: !prev.isBalanceVisible }));
  };

  const handleToggleStreetMode = () => {
    setUser((prev) => ({ ...prev, streetModeActive: !prev.streetModeActive }));
  };

  const handleUpdateBalance = (newBalance: number) => {
    const rounded = Number(newBalance.toFixed(2));
    setUser((prev) => {
      const updated = { ...prev, balance: rounded, customBalanceDisplay: undefined };
      try {
        localStorage.setItem('nu_custom_user', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleCompleteTransfer = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    // Transações de 'Hoje' removidas do histórico de conta conforme solicitado pelo usuário
  };

  const handleAddCaixinha = (newCaixinha: Caixinha) => {
    setCaixinhas((prev) => {
      const updated = [...prev, newCaixinha];
      try {
        localStorage.setItem('nu_custom_caixinhas', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDepositInCaixinha = (id: string, amount: number): boolean => {
    if (user.balance >= amount) {
      const newBal = Number((user.balance - amount).toFixed(2));
      setUser((prev) => {
        const updated = { ...prev, balance: newBal, customBalanceDisplay: undefined };
        try {
          localStorage.setItem('nu_custom_user', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      setCaixinhas((prev) => {
        const updated = prev.map((c) =>
          c.id === id
            ? {
                ...c,
                amount: Number((c.amount + amount).toFixed(2)),
                customAmountDisplay: undefined,
              }
            : c
        );
        try {
          localStorage.setItem('nu_custom_caixinhas', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      return true;
    }
    return false;
  };

  const handleWithdrawFromCaixinha = (id: string, amount: number): boolean => {
    const target = caixinhas.find((c) => c.id === id);
    if (target && target.amount >= amount) {
      const newBal = Number((user.balance + amount).toFixed(2));
      setUser((prev) => {
        const updated = { ...prev, balance: newBal, customBalanceDisplay: undefined };
        try {
          localStorage.setItem('nu_custom_user', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      setCaixinhas((prev) => {
        const updated = prev.map((c) =>
          c.id === id
            ? {
                ...c,
                amount: Number(Math.max(0, c.amount - amount).toFixed(2)),
                customAmountDisplay: undefined,
              }
            : c
        );
        try {
          localStorage.setItem('nu_custom_caixinhas', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setActiveModal(null);
    setIsUnlocked(false);
  };

  return (
    <IPhoneFrame>
      {/* 1. Splash / Face ID Lock Screen */}
      {!isUnlocked ? (
        <SplashScreen onUnlock={() => setIsUnlocked(true)} />
      ) : (
        /* 2. Main Authenticated App Layout */
        <div className="flex-1 flex flex-col bg-[#000000] text-white relative h-full">
          {/* Top Nubank Purple Header */}
          <Header
            user={user}
            onToggleBalanceVisibility={handleToggleBalanceVisibility}
            onOpenProfile={() => setActiveModal('profile')}
            onOpenHelp={() => setActiveModal('help')}
            onOpenProtectionCenter={() => setActiveModal('protection_center')}
          />

          {/* Tab Screen Switching: Home vs NuCel */}
          {currentTab === 'home' ? (
            <HomeScreen
              user={user}
              caixinhas={caixinhas}
              onOpenPixArea={() => setActiveModal('pix_area')}
              onOpenAccountDetails={() => setActiveModal('account_details')}
              onOpenPixScanner={() => setActiveModal('pix_scanner')}
              onOpenCards={() => setActiveModal('meus_cartoes')}
              onOpenCaixinhas={() => setActiveModal('caixinhas')}
              onOpenPaymentOptions={() => setActiveModal('payment_options')}
              onOpenPhoneRecharge={() => setActiveModal('phone_recharge')}
            />
          ) : (
            <NuCelScreen />
          )}

          {/* Bottom Floating Pill Dock: Finance vs NuCel */}
          <FloatingDock
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />

          {/* 3. Sub-Screens & Overlays */}
          {activeModal === 'account_details' && (
            <AccountDetailsScreen
              user={user}
              accountHistory={accountHistory}
              onBack={() => setActiveModal(null)}
              onOpenTransfer={() => setActiveModal('pix_transfer')}
              onOpenCaixinhas={() => setActiveModal('caixinhas')}
              onOpenHelp={() => setActiveModal('help')}
            />
          )}

          {activeModal === 'profile' && (
            <ProfileDrawer
              user={user}
              onClose={() => setActiveModal(null)}
              onLogout={handleLogout}
              onOpenSettings={() => setActiveModal('settings')}
            />
          )}

          {activeModal === 'settings' && (
            <AccountSettingsModal
              user={user}
              caixinhas={caixinhas}
              onClose={() => setActiveModal(null)}
              onSave={(updatedUser, updatedCaixinhas) => {
                setUser(updatedUser);
                setCaixinhas(updatedCaixinhas);
                try {
                  localStorage.setItem('nu_custom_user', JSON.stringify(updatedUser));
                  localStorage.setItem('nu_custom_caixinhas', JSON.stringify(updatedCaixinhas));
                } catch {
                  // ignore
                }
              }}
            />
          )}

          {activeModal === 'help' && (
            <HelpScreen
              userName={user.name}
              onBack={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'protection_center' && (
            <ProtectionCenterScreen
              user={user}
              onBack={() => setActiveModal(null)}
              onToggleStreetMode={handleToggleStreetMode}
            />
          )}

          {activeModal === 'pix_area' && (
            <PixAreaScreen
              onClose={() => setActiveModal(null)}
              onOpenHelp={() => setActiveModal('help')}
              onStartTransfer={() => setActiveModal('pix_transfer')}
              onStartScheduledPix={() => setActiveModal('pix_agendado_intro')}
              onStartQrScanner={() => setActiveModal('pix_scanner')}
              onStartCopiaCola={() => setActiveModal('pix_copia_cola')}
            />
          )}

          {activeModal === 'pix_transfer' && (
            <PixTransferFlow
              user={user}
              onUpdateBalance={handleUpdateBalance}
              onClose={() => setActiveModal(null)}
              onCompleteTransfer={handleCompleteTransfer}
            />
          )}

          {activeModal === 'pix_agendado_intro' && (
            <PixAgendadoIntro
              onClose={() => setActiveModal(null)}
              onStart={() => setActiveModal('pix_transfer')}
            />
          )}

          {activeModal === 'pix_scanner' && (
            <PixScannerScreen
              onBack={() => setActiveModal(null)}
              onScanSuccess={() => {
                setActiveModal('pix_transfer');
              }}
            />
          )}

          {activeModal === 'pix_copia_cola' && (
            <PixCopiaColaScreen
              onBack={() => setActiveModal(null)}
              onProceed={() => {
                setActiveModal('pix_transfer');
              }}
            />
          )}

          {activeModal === 'caixinhas' && (
            <CaixinhasScreen
              user={user}
              caixinhas={caixinhas}
              onBack={() => setActiveModal(null)}
              onAddCaixinha={handleAddCaixinha}
              onDepositInCaixinha={handleDepositInCaixinha}
              onWithdrawFromCaixinha={handleWithdrawFromCaixinha}
            />
          )}

          {activeModal === 'meus_cartoes' && (
            <MeusCartoesModal
              user={user}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'payment_options' && (
            <PaymentOptionsModal
              onClose={() => setActiveModal(null)}
              onSelectBoleto={() => setActiveModal('barcode_scanner')}
              onSelectPix={() => setActiveModal('pix_area')}
            />
          )}

          {activeModal === 'barcode_scanner' && (
            <BarcodeScannerModal
              onBack={() => setActiveModal('payment_options')}
              onManualInput={() => setActiveModal('boleto_manual')}
            />
          )}

          {activeModal === 'boleto_manual' && (
            <BoletoManualInputModal
              user={user}
              onBack={() => setActiveModal('barcode_scanner')}
              onCompletePayment={(amount, tx) => {
                handleUpdateBalance(user.balance - amount);
                handleCompleteTransfer(tx);
              }}
            />
          )}

          {activeModal === 'phone_recharge' && (
            <PhoneRechargeModal
              user={user}
              onClose={() => setActiveModal(null)}
              onCompleteRecharge={(amount, tx) => {
                handleUpdateBalance(user.balance - amount);
                handleCompleteTransfer(tx);
              }}
            />
          )}
        </div>
      )}
    </IPhoneFrame>
  );
}
