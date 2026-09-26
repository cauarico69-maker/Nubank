import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  QrCode,
  Check,
  Calendar as CalendarIcon,
  ChevronDown,
  Edit2,
  Share,
  FileText,
  Copy,
} from 'lucide-react';
import { Contact, Transaction, UserAccount } from '../types';
import { MOCK_CONTACTS } from '../data/mockData';
import { NuLogo, NuEyeIcon } from './NuLogo';
import { NuTransferSuccessIllustration } from './NuTransferSuccessIllustration';
import { formatBRL } from '../utils/formatCurrency';
import confetti from 'canvas-confetti';

interface PixTransferFlowProps {
  user: UserAccount;
  onUpdateBalance: (newBalance: number) => void;
  onClose: () => void;
  onCompleteTransfer: (transaction: Transaction) => void;
}

type Step =
  | 'search'
  | 'choose_account'
  | 'amount'
  | 'schedule_calendar'
  | 'review'
  | 'pin'
  | 'processing'
  | 'success'
  | 'receipt';

interface RecipientAccount {
  id: string;
  bankName: string;
  pixKey: string;
  keyType: string;
  badgeBg: string;
  badgeText: string;
  badgeColor: string;
}

const CAUA_ACCOUNTS: RecipientAccount[] = [
  {
    id: 'nu_caua',
    bankName: 'NU PAGAMENTOS - IP',
    pixKey: '+5581994689968',
    keyType: 'Chave Pix • Celular',
    badgeBg: '#820AD1',
    badgeText: 'nu',
    badgeColor: '#FFFFFF',
  },
];

const RENATA_ACCOUNTS: RecipientAccount[] = [
  {
    id: 'inter',
    bankName: 'BANCO INTER',
    pixKey: 'cauasouzaazz@gmail.com',
    keyType: 'Chave Pix • Email',
    badgeBg: '#FF7A00',
    badgeText: 'inter',
    badgeColor: '#FFFFFF',
  },
  {
    id: 'itau',
    bankName: 'Itaú UNIBANCO S.A.',
    pixKey: '+5519895793568',
    keyType: 'Chave Pix • Celular',
    badgeBg: '#EC7000',
    badgeText: 'itaú',
    badgeColor: '#002B7A',
  },
  {
    id: 'caixa',
    bankName: 'CAIXA ECONOMICA FEDERAL',
    pixKey: '03098277440',
    keyType: 'Chave Pix • CPF',
    badgeBg: '#005CA9',
    badgeText: 'X',
    badgeColor: '#F37021',
  },
];

export const getBankDetails = (bankRaw: string = '') => {
  const b = bankRaw.toUpperCase();
  if (b.includes('MERCADO PAGO') || b.includes('MERCADOPAGO') || b.includes('MP')) {
    return {
      bankName: 'MERCADO PAGO IP LTDA.',
      badgeBg: '#009EE3',
      badgeText: 'mp',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('INTER')) {
    return {
      bankName: 'BANCO INTER',
      badgeBg: '#FF7A00',
      badgeText: 'inter',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('ITAU') || b.includes('ITAÚ')) {
    return {
      bankName: 'Itaú UNIBANCO S.A.',
      badgeBg: '#EC7000',
      badgeText: 'itaú',
      badgeColor: '#002B7A',
    };
  }
  if (b.includes('CAIXA')) {
    return {
      bankName: 'CAIXA ECONOMICA FEDERAL',
      badgeBg: '#005CA9',
      badgeText: 'X',
      badgeColor: '#F37021',
    };
  }
  if (b.includes('BRADESCO')) {
    return {
      bankName: 'BANCO BRADESCO S.A.',
      badgeBg: '#CC092F',
      badgeText: 'bra',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('BRASIL') || b.includes('BB')) {
    return {
      bankName: 'BANCO DO BRASIL S.A.',
      badgeBg: '#FCED00',
      badgeText: 'BB',
      badgeColor: '#003399',
    };
  }
  if (b.includes('SANTANDER')) {
    return {
      bankName: 'BANCO SANTANDER (BRASIL) S.A.',
      badgeBg: '#EC0000',
      badgeText: 'san',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('C6')) {
    return {
      bankName: 'BANCO C6 S.A.',
      badgeBg: '#242424',
      badgeText: 'C6',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('PAGBANK') || b.includes('PAGSEGURO')) {
    return {
      bankName: 'PAGBANK PAGSEGURO',
      badgeBg: '#00B131',
      badgeText: 'pag',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('PICPAY')) {
    return {
      bankName: 'PICPAY BANK',
      badgeBg: '#11C76F',
      badgeText: 'pic',
      badgeColor: '#FFFFFF',
    };
  }
  if (b.includes('NUBANK') || b.includes('NU PAGAMENTOS')) {
    return {
      bankName: 'NU PAGAMENTOS - IP',
      badgeBg: '#820AD1',
      badgeText: 'nu',
      badgeColor: '#FFFFFF',
    };
  }

  return {
    bankName: bankRaw || 'NU PAGAMENTOS - IP',
    badgeBg: '#2a2a32',
    badgeText: (bankRaw || 'PIX').slice(0, 3).toUpperCase(),
    badgeColor: '#FFFFFF',
  };
};

export const PixTransferFlow: React.FC<PixTransferFlowProps> = ({
  user,
  onUpdateBalance,
  onClose,
  onCompleteTransfer,
}) => {
  const [step, setStep] = useState<Step>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact>(MOCK_CONTACTS[0]);
  const [selectedAccount, setSelectedAccount] = useState<RecipientAccount>(CAUA_ACCOUNTS[0]);
  const [rawAmountCents, setRawAmountCents] = useState<number>(1); // Default R$ 0,01 matching screenshot
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [isBalanceHidden, setIsBalanceHidden] = useState(!user.isBalanceVisible);
  const [transferMessage, setTransferMessage] = useState('');
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  // Real Pix Provider Resolution State
  const [isResolving, setIsResolving] = useState(false);
  const [resolveError, setResolveError] = useState<string | null>(null);

  // Processing animations (NO Banco Inter notification!)
  const [processProgress, setProcessProgress] = useState(0);
  const [processStatusText, setProcessStatusText] = useState('Transferindo...');

  const amountNumber = rawAmountCents / 100;
  const isInsufficient = amountNumber > user.balance;

  // Format currency with standard pt-BR thousands separators (e.g. 1.000,00)
  const formatCurrency = (cents: number) => {
    const val = (cents || 0) / 100;
    return formatBRL(val);
  };

  const cleanDigits = searchQuery.replace(/\D/g, '');

  const formatCpf = (digits: string): string => {
    const d = digits.slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  };

  const formatPhone = (digits: string): string => {
    const clean = digits.startsWith('55') && digits.length > 11 ? digits.slice(2) : digits;
    const d = clean.slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const isTypingCpf = cleanDigits.length === 11 || (cleanDigits.length >= 9 && searchQuery.includes('.'));
  const isTypingPhone = !isTypingCpf && cleanDigits.length >= 10 && cleanDigits.length <= 13;

  const filteredContacts = MOCK_CONTACTS.filter((c) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.trim().toLowerCase();

    // Name match
    if (c.name.toLowerCase().includes(query) || c.fullName.toLowerCase().includes(query)) {
      return true;
    }

    // Email match
    if (c.email && c.email.toLowerCase().includes(query)) {
      return true;
    }

    // Number / CPF / Phone match
    if (cleanDigits.length > 0) {
      const cFullCpfDigits = (c.fullCpf || '').replace(/\D/g, '');
      const cCpfDigits = c.cpf.replace(/\D/g, '');
      const cPhoneDigits = (c.phone || '').replace(/\D/g, '');

      if (cFullCpfDigits && (cFullCpfDigits.includes(cleanDigits) || cleanDigits.includes(cFullCpfDigits))) {
        return true;
      }
      if (cCpfDigits && (cCpfDigits.includes(cleanDigits) || cleanDigits.includes(cCpfDigits))) {
        return true;
      }
      if (
        cPhoneDigits &&
        (cPhoneDigits.includes(cleanDigits) ||
          cleanDigits.includes(cPhoneDigits.slice(-8)) ||
          cleanDigits.includes(cPhoneDigits.slice(-9)))
      ) {
        return true;
      }
    }

    return false;
  });

  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'PX';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleResolvePixKey = async (keyInput?: string) => {
    const targetKey = (keyInput || searchQuery).trim();
    if (!targetKey) return;

    const digits = targetKey.replace(/\D/g, '');
    const lower = targetKey.toLowerCase();

    // 1. Direct match with Renata Silva (CPF 03098277440, Phone 19895793568, Email or Name)
    if (
      digits === '03098277440' ||
      digits.includes('03098277440') ||
      digits.includes('982774') ||
      digits.includes('19895793568') ||
      lower.includes('renata') ||
      lower.includes('cauasouzaazz')
    ) {
      const renata = MOCK_CONTACTS.find((c) => c.fullName.toLowerCase().includes('renata')) || MOCK_CONTACTS[1];
      setSelectedContact(renata);
      // If Caixa CPF key, select Caixa account; if phone, select Itaú; else default to Inter
      if (digits === '03098277440' || digits.includes('03098277440')) {
        setSelectedAccount(RENATA_ACCOUNTS[2]);
      } else if (digits.includes('19895793568')) {
        setSelectedAccount(RENATA_ACCOUNTS[1]);
      } else {
        setSelectedAccount(RENATA_ACCOUNTS[0]);
      }
      setStep('choose_account');
      return;
    }

    // 2. Direct match with Cauã Souza Barros (Phone +5581994689968, CPF 746484, or Name)
    if (
      digits.includes('81994689968') ||
      digits.includes('994689968') ||
      digits.includes('746484') ||
      lower.includes('caua') ||
      lower.includes('cauã')
    ) {
      const caua = MOCK_CONTACTS.find((c) => c.id === 'caua_contact') || MOCK_CONTACTS[0];
      setSelectedContact(caua);
      setSelectedAccount(CAUA_ACCOUNTS[0]);
      setStep('amount');
      return;
    }

    // 3. Match any existing contact by name, full name, CPF, or phone (e.g. Davi Santana, Hugo, Severina, etc.)
    const matchedContact = MOCK_CONTACTS.find((c) => {
      if (
        c.name.toLowerCase().includes(lower) ||
        c.fullName.toLowerCase().includes(lower)
      ) {
        return true;
      }
      if (digits.length > 0) {
        const cFullCpfDigits = (c.fullCpf || '').replace(/\D/g, '');
        const cCpfDigits = c.cpf.replace(/\D/g, '');
        const cPhoneDigits = (c.phone || '').replace(/\D/g, '');
        if (cFullCpfDigits && (cFullCpfDigits === digits || cFullCpfDigits.includes(digits) || digits.includes(cFullCpfDigits))) {
          return true;
        }
        if (cCpfDigits && (cCpfDigits === digits || cCpfDigits.includes(digits) || digits.includes(cCpfDigits))) {
          return true;
        }
        if (cPhoneDigits && (cPhoneDigits === digits || cPhoneDigits.includes(digits) || digits.includes(cPhoneDigits.slice(-8)))) {
          return true;
        }
      }
      return false;
    });

    if (matchedContact) {
      handleSelectContact(matchedContact);
      return;
    }

    // 4. If matches exactly one contact in filtered contacts
    if (filteredContacts.length === 1) {
      handleSelectContact(filteredContacts[0]);
      return;
    }

    // 5. Generic resolution or external provider
    setIsResolving(true);
    setResolveError(null);

    try {
      const response = await fetch('/api/pix/resolve-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: targetKey }),
      });

      const data = await response.json();

      if (data.success && data.recipient) {
        const recipientContact: Contact = {
          id: 'resolved_' + Date.now(),
          name: data.recipient.name,
          fullName: data.recipient.name,
          bank: data.recipient.institution || 'NU PAGAMENTOS - IP',
          cpf: data.recipient.document || '***.***.***-**',
          keyType: 'CPF',
          initials: getInitials(data.recipient.name),
          isRecent: true,
        };

        const recipientAcc: RecipientAccount = {
          id: 'acc_' + Date.now(),
          bankName: data.recipient.institution || 'NU PAGAMENTOS - IP',
          pixKey: targetKey,
          keyType: digits.length === 11 ? 'Chave Pix • CPF' : 'Chave Pix',
          badgeBg: '#820AD1',
          badgeText: 'nu',
          badgeColor: '#FFFFFF',
        };

        setSelectedContact(recipientContact);
        setSelectedAccount(recipientAcc);
        setStep('amount');
      } else {
        // Fallback smooth transition without blocking error
        const isCpfKey = digits.length === 11;
        const formattedKey = isCpfKey ? formatCpf(digits) : digits.length >= 10 ? formatPhone(digits) : targetKey;
        const recipientContact: Contact = {
          id: 'resolved_' + Date.now(),
          name: isCpfKey ? 'Destinatário CPF' : 'Destinatário Pix',
          fullName: isCpfKey ? 'DESTINATÁRIO PIX' : 'DESTINATÁRIO PIX',
          bank: 'NU PAGAMENTOS - IP',
          cpf: isCpfKey ? `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**` : '***.***.***-**',
          keyType: isCpfKey ? 'CPF' : 'Telefone',
          initials: 'PX',
          isRecent: true,
        };

        const recipientAcc: RecipientAccount = {
          id: 'acc_' + Date.now(),
          bankName: 'NU PAGAMENTOS - IP',
          pixKey: formattedKey,
          keyType: isCpfKey ? 'Chave Pix • CPF' : 'Chave Pix',
          badgeBg: '#820AD1',
          badgeText: 'nu',
          badgeColor: '#FFFFFF',
        };

        setSelectedContact(recipientContact);
        setSelectedAccount(recipientAcc);
        setStep('amount');
      }
    } catch {
      const isCpfKey = digits.length === 11;
      const formattedKey = isCpfKey ? formatCpf(digits) : digits.length >= 10 ? formatPhone(digits) : targetKey;
      const recipientContact: Contact = {
        id: 'resolved_' + Date.now(),
        name: isCpfKey ? 'Destinatário CPF' : 'Destinatário Pix',
        fullName: isCpfKey ? 'DESTINATÁRIO PIX' : 'DESTINATÁRIO PIX',
        bank: 'NU PAGAMENTOS - IP',
        cpf: isCpfKey ? `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**` : '***.***.***-**',
        keyType: isCpfKey ? 'CPF' : 'Telefone',
        initials: 'PX',
        isRecent: true,
      };

      const recipientAcc: RecipientAccount = {
        id: 'acc_' + Date.now(),
        bankName: 'NU PAGAMENTOS - IP',
        pixKey: formattedKey,
        keyType: isCpfKey ? 'Chave Pix • CPF' : 'Chave Pix',
        badgeBg: '#820AD1',
        badgeText: 'nu',
        badgeColor: '#FFFFFF',
      };

      setSelectedContact(recipientContact);
      setSelectedAccount(recipientAcc);
      setStep('amount');
    } finally {
      setIsResolving(false);
    }
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    if (contact.fullName.toLowerCase().includes('renata')) {
      setSelectedAccount(RENATA_ACCOUNTS[0]);
      setStep('choose_account');
      return;
    }

    if (contact.fullName.toLowerCase().includes('cauã') || contact.fullName.toLowerCase().includes('caua')) {
      setSelectedAccount(CAUA_ACCOUNTS[0]);
      setStep('amount');
      return;
    }

    // Dynamic bank analysis based on contact.bank (e.g. Davi Santana -> Mercado Pago, etc.)
    const bankInfo = getBankDetails(contact.bank);
    const key = contact.fullCpf || contact.phone || contact.cpf;
    const formattedPixKey =
      contact.keyType === 'CPF'
        ? contact.fullCpf
          ? formatCpf(contact.fullCpf)
          : contact.cpf
        : contact.keyType === 'Telefone' && contact.phone
        ? formatPhone(contact.phone)
        : key;

    setSelectedAccount({
      id: `acc_${contact.id}`,
      bankName: bankInfo.bankName,
      pixKey: formattedPixKey,
      keyType: `Chave Pix • ${contact.keyType || 'CPF'}`,
      badgeBg: bankInfo.badgeBg,
      badgeText: bankInfo.badgeText,
      badgeColor: bankInfo.badgeColor,
    });
    setStep('amount');
  };

  const handleSelectAccount = (acc: RecipientAccount) => {
    setSelectedAccount(acc);
    setStep('amount');
  };

  const handlePinPress = (val: string) => {
    if (val === 'backspace') {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 4) {
      const next = pin + val;
      setPin(next);
      if (next.length === 4) {
        startProcessing();
      }
    }
  };

  const startProcessing = () => {
    setStep('processing');
    setProcessProgress(15);
    setProcessStatusText('Transferindo...');

    // Progress step 1 - NO Banco Inter notification
    setTimeout(() => {
      setProcessProgress(55);
    }, 800);

    // Progress step 2
    setTimeout(() => {
      setProcessProgress(85);
      setProcessStatusText('Gerando comprovante...');
    }, 1600);

    // Progress step 3: Completed
    setTimeout(() => {
      setProcessProgress(100);
      setProcessStatusText('Pronto!');

      const actualAmount = amountNumber || 0.01;
      const newTx: Transaction = {
        id: 'E18236120202609211412s16118a3bfc',
        type: scheduledDate ? 'scheduled' : 'pix_transfer',
        recipientName: selectedContact.fullName,
        recipientBank: selectedAccount.bankName,
        recipientCpf: selectedContact.cpf,
        amount: actualAmount,
        date: new Date().toISOString(),
        formattedDate: '21 SET 2026 - 11:12:21',
        status: scheduledDate ? 'scheduled' : 'completed',
        scheduledDate: scheduledDate || undefined,
        message: transferMessage || undefined,
      };

      // REAL BALANCE DECREASE: Deduct directly from balance!
      if (!scheduledDate) {
        const newBal = Number(Math.max(0, user.balance - actualAmount).toFixed(2));
        onUpdateBalance(newBal);
      }

      onCompleteTransfer(newTx);

      setTimeout(() => {
        setStep('success');
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.45 },
            colors: ['#820AD1', '#ffffff', '#22c55e', '#a855f7'],
          });
        } catch {
          // ignore
        }
      }, 400);
    }, 2400);
  };

  /* =========================================================
     STEP 1: SEARCH RECIPIENT ("Para quem você quer transferir?")
     - NO simulated iOS keyboard!
     ========================================================= */
  if (step === 'search') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in">
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <button
              onClick={onClose}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="px-5 pt-1 space-y-5">
            <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
              Para quem você quer transferir?
            </h1>

            {/* Input field */}
            <div className="space-y-1.5">
              <span className="text-xs text-white/60">Insira o dado de quem vai receber</span>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Nome, CPF/CNPJ ou chave Pix"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (resolveError) setResolveError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleResolvePixKey();
                    }
                  }}
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#820AD1] py-2.5 pr-10 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      handleResolvePixKey();
                    } else {
                      alert('Aponte para o QR Code Pix');
                    }
                  }}
                  className="absolute right-0 text-white/70 hover:text-white cursor-pointer"
                >
                  {isResolving ? (
                    <div className="w-4 h-4 border-2 border-[#820AD1] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <QrCode className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Error message requested by user */}
              {resolveError && (
                <div className="pt-1.5 text-xs text-[#ff5353] font-medium leading-tight animate-fade-in flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5353] shrink-0" />
                  <span>{resolveError}</span>
                </div>
              )}

              <p className="text-[11px] text-white/40 pt-1 leading-snug">
                Para transferir com os dados de agência e conta, insira CPF ou CNPJ primeiro.
              </p>
            </div>

            {/* Section: Você sempre costuma pagar */}
            {!searchQuery && (
              <div className="pt-2 space-y-3">
                <h3 className="text-xs font-semibold text-white/60 tracking-wider">
                  Você sempre costuma pagar
                </h3>

                <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
                  {MOCK_CONTACTS.filter((c) => c.isRecent).map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleSelectContact(contact)}
                      className="flex flex-col items-center gap-2 min-w-[76px] group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#1c1c20] group-hover:bg-[#27272e] flex items-center justify-center font-bold text-sm text-white/90 border border-white/5 transition-all">
                        {contact.initials}
                      </div>
                      <span className="text-[11px] font-semibold text-center text-white line-clamp-1">
                        {contact.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Todos os seus contatos OR Resultados */}
            <div className="pt-2 space-y-2">
              <h3 className="text-xs font-semibold text-white/60 tracking-wider">
                {searchQuery ? 'Resultados' : 'Todos os seus contatos'}
              </h3>

              <div className="divide-y divide-white/5">
                {searchQuery.trim() && (
                  <div
                    onClick={() => handleResolvePixKey()}
                    className="py-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-[#820AD1] flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                        {isResolving ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span className="text-[10px] tracking-wider font-extrabold">PIX</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] text-white/50 block">
                          {isTypingCpf
                            ? 'Transferir para este CPF'
                            : isTypingPhone
                            ? 'Transferir para este telefone'
                            : 'Transferir para a chave Pix'}
                        </span>
                        <p className="text-sm font-semibold text-white truncate">
                          {isTypingCpf
                            ? formatCpf(cleanDigits)
                            : isTypingPhone
                            ? formatPhone(cleanDigits)
                            : searchQuery}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#a855f7] group-hover:text-purple-300 transition-colors shrink-0 ml-2">
                      {isResolving ? 'Buscando...' : 'Transferir →'}
                    </span>
                  </div>
                )}

                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleSelectContact(contact)}
                    className="py-3.5 flex items-center gap-3.5 cursor-pointer hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#1c1c20] flex items-center justify-center font-bold text-xs text-white/80 shrink-0">
                      {contact.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {contact.fullName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 2: CHOOSE ACCOUNT BOTTOM SHEET
     ========================================================= */
  if (step === 'choose_account') {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end select-none animate-fade-in">
        <div className="flex-1" onClick={() => setStep('search')} />

        <div className="bg-[#121215] border-t border-white/10 rounded-t-[32px] p-6 pb-10 space-y-5 animate-slide-up max-h-[88vh] overflow-y-auto">
          {/* Top handle */}
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />

          {/* Contact header with Edit icon */}
          <div className="flex items-start justify-between pt-1">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
                {selectedContact.fullName}
              </h2>
              <p className="text-xs text-white/60 pt-0.5">
                CPF •••.982.774-••
              </p>
            </div>
            <button
              onClick={() => alert('Editar contato')}
              className="p-2 text-white/60 hover:text-white cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-semibold text-white/80 pb-3">Qual conta?</h3>

            <div className="space-y-3">
              {RENATA_ACCOUNTS.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc)}
                  className="p-4 rounded-2xl bg-[#1a1a20] hover:bg-[#25252e] active:scale-98 transition-all flex items-center justify-between cursor-pointer border border-white/5"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm"
                      style={{ backgroundColor: acc.badgeBg, color: acc.badgeColor }}
                    >
                      {acc.badgeText}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{acc.bankName}</h4>
                      <p className="text-xs text-white/70 font-medium truncate max-w-[210px]">
                        {acc.pixKey}
                      </p>
                      <span className="text-[10px] text-white/50">{acc.keyType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 3: ENTER AMOUNT SCREEN (EXACTLY MATCHING image (3).png!)
     - Top back arrow '<'
     - "Transferir para"
     - "Cauã Souza Barros"
     - "Valor"
     - "R$ 0,01"
     - Horizontal line divider
     - "Pagando com" + eye icon on same line
     - Compact purple rounded card "Conta Nubank"
       Icon at top
       Conta Nubank
       Atual: R$ 61,10
       Envio imediato
     - NO preset chips below
     - Bottom: Full width purple rounded button "Continuar"
     ========================================================= */
  if (step === 'amount') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between select-none animate-fade-in px-6 pt-5 pb-8">
        <div>
          {/* Header with back arrow matching image (3).png */}
          <div className="flex items-center pb-4">
            <button
              onClick={() => setStep('search')}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          </div>

          {/* Transferir para */}
          <div className="space-y-0.5 pt-2">
            <span className="text-xs text-white/50 block">Transferir para</span>
            <p className="text-sm font-medium text-white tracking-tight">
              {selectedContact.fullName}
            </p>
          </div>

          {/* Valor */}
          <div className="pt-6 space-y-1">
            <span className="text-xs text-white/50 block">Valor</span>
            <div className="flex items-baseline gap-1.5 pb-3 border-b border-white/20">
              <span className="text-base font-bold text-white">R$</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                value={formatCurrency(rawAmountCents)}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '');
                  const num = parseInt(cleaned || '0', 10);
                  if (num < 100000000) {
                    setRawAmountCents(num);
                  }
                }}
                className="w-full bg-transparent text-base font-bold text-white focus:outline-none tracking-tight"
                placeholder="0,00"
              />
            </div>

            {/* Warning if insufficient */}
            {isInsufficient && rawAmountCents > 0 && (
              <p className="text-xs text-purple-300 pt-1 leading-tight">
                Este valor é maior do que seu saldo disponível. Agende o pagamento.
              </p>
            )}
          </div>

          {/* Pagando com header with eye toggle on the right matching image (3).png */}
          <div className="pt-8 space-y-3">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Pagando com</span>
              <button
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                className="p-1 hover:text-white cursor-pointer text-white/80"
              >
                <NuEyeIcon isOpen={!isBalanceHidden} className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Compact purple rounded card matching image (3).png */}
            <div className="w-40 sm:w-44 p-4 rounded-2xl border border-[#7c3aed] bg-[#1a0a2a]/90 space-y-5 shadow-md">
              {/* Banknote icon */}
              <div className="text-purple-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-4">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>

              {/* Text lines in purple */}
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-purple-300">Conta Nubank</h4>
                <p className="text-[11px] text-purple-300 font-medium">
                  Atual:{' '}
                  {isBalanceHidden ? (
                    '••••'
                  ) : (
                    `R$ ${formatBRL(user.balance)}`
                  )}
                </p>
                <p className="text-[10px] text-purple-400/90 pt-0.5">Envio imediato</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continuar button matching image (3).png */}
        <div className="pt-6">
          <button
            onClick={() => {
              if (rawAmountCents === 0) return;
              if (isInsufficient) {
                setStep('schedule_calendar');
              } else {
                setStep('review');
              }
            }}
            disabled={rawAmountCents === 0}
            className={`w-full font-bold text-sm py-4 rounded-full transition-all cursor-pointer shadow-lg ${
              rawAmountCents > 0
                ? 'bg-[#5b1da3] hover:bg-[#6b21a8] active:scale-98 text-white'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 4: SCHEDULE CALENDAR
     ========================================================= */
  if (step === 'schedule_calendar') {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const selectedDay = scheduledDate ? parseInt(scheduledDate.split('/')[0], 10) : 22;

    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in p-6">
        <div>
          <div className="flex items-center pb-2">
            <button
              onClick={() => setStep('amount')}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="space-y-4 pt-1">
            <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
              Para quando você quer agendar?
            </h1>
            <p className="text-xs text-white/60">
              Seu saldo no Nubank é insuficiente para transferir agora.
            </p>

            <div className="bg-[#121216] border border-white/10 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Setembro de 2026</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/50 font-medium">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs font-semibold">
                <div />
                <div />
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setScheduledDate(`${d}/09/2026`)}
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      d === selectedDay
                        ? 'bg-[#820AD1] text-white font-bold shadow-md'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={() => {
              if (!scheduledDate) setScheduledDate('22/09/2026');
              setStep('review');
            }}
            className="w-full bg-[#5b1da3] hover:bg-[#6b21a8] active:scale-98 text-white font-bold text-sm py-4 rounded-full transition-all cursor-pointer shadow-lg"
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 5: REVIEW ("Você vai enviar" - EXACTLY MATCHING image (4).png!)
     - Top back arrow '<'
     - Title: "Você vai enviar"
     - Row: "R$ 0,01" + "Conta Nubank" + purple pencil
     - Arrow ↓
     - Recipient in purple: "Cauã Souza Barros"
     - "NU PAGAMENTOS - IP"
     - "+5581994689968"
     - "Detalhes" + chevron down
     - Line divider
     - "Quando" + "Agora, sem repetir" + purple calendar icon
     - "Via" + "Pix" + purple pencil icon
     - "Mensagem" + purple '+'
     - BOTTOM: Side-by-side!
       Left: "R$ 0,01" / "Valor Total"
       Right: Purple button "Enviar"
     ========================================================= */
  if (step === 'review') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in px-6 pt-5 pb-8">
        <div>
          {/* Header with back arrow */}
          <div className="flex items-center pb-3">
            <button
              onClick={() => setStep('amount')}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          </div>

          <div className="space-y-4 pt-1">
            <h1 className="text-xl font-bold tracking-tight text-white">Você vai enviar</h1>

            {/* Row 1: Amount & Conta Nubank + purple edit pencil */}
            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-base font-bold text-white">
                  R$ {formatCurrency(rawAmountCents)}
                </div>
                <span className="text-xs text-white/50">Conta Nubank</span>
              </div>
              <button
                onClick={() => setStep('amount')}
                className="p-1 cursor-pointer text-[#a855f7] hover:text-purple-300"
              >
                <Edit2 className="w-4 h-4 text-[#a855f7]" />
              </button>
            </div>

            {/* Arrow down divider matching image (4).png */}
            <div className="relative flex items-center justify-center my-1">
              <div className="w-full border-t border-white/10" />
              <span className="absolute bg-[#000000] px-2 text-white/40 text-xs">↓</span>
            </div>

            {/* Row 2: Recipient in purple matching image (4).png */}
            <div className="space-y-1 py-1">
              <h3 className="text-sm font-bold text-[#a855f7]">
                {selectedContact.fullName}
              </h3>
              <p className="text-xs text-white/50 font-normal">
                {selectedAccount.bankName}
              </p>
              <p className="text-xs text-white/50">
                {selectedAccount.pixKey}
              </p>
            </div>

            {/* Accordion header: Detalhes v */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-white/50">Detalhes</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </div>

            {/* Full width divider line */}
            <div className="border-t border-white/10 my-1" />

            {/* Details list matching image (4).png */}
            <div className="space-y-5 text-xs pt-1">
              {/* Quando */}
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-white/50 block">Quando</span>
                  <span className="text-xs font-normal text-white">
                    {scheduledDate ? `Agendado para ${scheduledDate}` : 'Agora, sem repetir'}
                  </span>
                </div>
                <button
                  onClick={() => setStep('schedule_calendar')}
                  className="text-[#a855f7] hover:text-purple-300 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4 text-[#a855f7]" />
                </button>
              </div>

              {/* Via */}
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-white/50 block">Via</span>
                  <span className="text-xs font-normal text-white">Pix</span>
                </div>
                <button
                  onClick={() => alert('Opções de pagamento')}
                  className="text-[#a855f7] hover:text-purple-300 cursor-pointer"
                >
                  <Edit2 className="w-4 h-4 text-[#a855f7]" />
                </button>
              </div>

              {/* Mensagem */}
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-white/50 block">Mensagem</span>
                  {showAddMessage ? (
                    <input
                      type="text"
                      placeholder="Adicionar nota..."
                      value={transferMessage}
                      onChange={(e) => setTransferMessage(e.target.value)}
                      className="bg-[#1a1a20] rounded px-2 py-0.5 text-xs text-white focus:outline-none"
                    />
                  ) : null}
                </div>
                <button
                  onClick={() => setShowAddMessage(!showAddMessage)}
                  className="text-[#a855f7] hover:text-purple-300 cursor-pointer text-lg font-bold leading-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Valor Total on left + Enviar button on right matching image (4).png */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-white">
              R$ {formatCurrency(rawAmountCents)}
            </div>
            <span className="text-xs text-white/50 block">Valor Total</span>
          </div>

          <button
            onClick={() => setStep('pin')}
            className="bg-[#5b1da3] hover:bg-[#6b21a8] active:scale-95 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all cursor-pointer shadow-lg"
          >
            Enviar
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 6: 4-DIGIT PIN
     ========================================================= */
  if (step === 'pin') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in p-6">
        <div>
          <div className="flex items-center pb-4">
            <button
              onClick={() => setStep('review')}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Digite sua senha de 4 dígitos
            </h1>
            <p className="text-xs text-white/60 leading-normal">
              Essa é a mesma senha de 4 dígitos do seu cartão do Nubank.
            </p>

            {/* 4 Dots */}
            <div className="flex justify-center gap-6 py-10">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    pin.length > idx
                      ? 'bg-white border-white scale-110'
                      : 'border-white/30 bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-6 max-w-[280px] mx-auto pb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'backspace'].map((key, i) => {
            if (key === '') return <div key={i} />;
            return (
              <button
                key={i}
                onClick={() => handlePinPress(key)}
                className="h-14 rounded-full active:bg-white/15 text-white font-semibold text-2xl flex items-center justify-center transition-colors cursor-pointer"
              >
                {key === 'backspace' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 7: PROCESSING
     "quando for tranferir pare de mostrar como se chegasse uma notificação do banco inter"
     ========================================================= */
  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between select-none animate-fade-in p-6">
        <div className="flex-1" />

        {/* Text and progress bar at the bottom */}
        <div className="w-full pb-10 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {processStatusText}
          </h2>

          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5b1da3] transition-all duration-500 rounded-full"
              style={{ width: `${processProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 8: SUCCESS SCREEN (EXACTLY MATCHING image (6).png!)
     - Top X close button on left
     - Diagonal dark capsule illustration with 2 purple circles + 1 bright green checkmark circle
     - Title: "Sua transferência foi concluída"
     - Amount: "R$ 0,01"
     - Subtitle: "Para Cauã Souza Barros"
     - Divider line
     - Table:
       Instituição .......... NU PAGAMENTOS - IP
       Quando ............... Agora
     - Bottom button:
       Rounded-full purple button with receipt icon + "Abrir comprovante"
     ========================================================= */
  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none animate-fade-in px-6 pt-5 pb-8">
        <div>
          {/* Top Left Close X matching image (6).png */}
          <div className="flex items-center pb-2">
            <button
              onClick={onClose}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors cursor-pointer text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* EXACT Nubank graphic and text matching user image (LEFT ALIGNED) */}
          <div className="pt-2 text-left">
            {/* 3D Illustration aligned to the left matching image (7).png */}
            <div className="relative flex items-center justify-start -ml-1">
              <NuTransferSuccessIllustration className="w-40 h-40 sm:w-44 sm:h-44" />
            </div>

            {/* Title aligned to the left */}
            <h1 className="text-xl font-bold tracking-tight text-white pt-3 text-left">
              Sua transferência foi concluída
            </h1>

            {/* Amount and recipient aligned to the left with vertical spacing */}
            <div className="pt-10 space-y-1 text-left">
              <div className="text-3xl font-extrabold text-white tracking-tight text-left">
                R$ {formatCurrency(rawAmountCents || 1)}
              </div>

              <p className="text-xs text-white/60 tracking-tight text-left">
                Para {selectedContact.fullName}
              </p>
            </div>
          </div>

          {/* Divider line matching image (6).png */}
          <div className="border-t border-white/10 my-6" />

          {/* Details Table matching image (6).png */}
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Instituição</span>
              <span className="text-white/90 font-medium">{selectedAccount.bankName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Quando</span>
              <span className="text-white/90 font-medium">Agora</span>
            </div>
          </div>
        </div>

        {/* Bottom Button: Abrir comprovante matching image (6).png */}
        <div className="pt-6">
          <button
            onClick={() => setStep('receipt')}
            className="w-full bg-[#5b1da3] hover:bg-[#6b21a8] active:scale-98 text-white font-bold text-sm py-4 rounded-full transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2.5"
          >
            <FileText className="w-4 h-4" />
            <span>Abrir comprovante</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     STEP 9: COMPROVANTE (RECEIPT)
     ========================================================= */
  return (
    <div className="fixed inset-0 z-50 bg-[#F5F5F7] text-[#111111] flex flex-col justify-between overflow-y-auto select-none animate-fade-in">
      <div>
        {/* Top bar on white receipt */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-white border-b border-black/5">
          <button
            onClick={onClose}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 cursor-pointer text-black"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowShareSheet(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 cursor-pointer text-black"
          >
            <Share className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content Card */}
        <div className="p-6 space-y-6">
          {/* Nubank Logo with Checkmark */}
          <div className="flex items-center gap-3">
            <NuLogo className="w-12 h-8" color="#820AD1" />
            <div className="w-5 h-5 rounded-full bg-[#00A868] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-black">
              Comprovante de transferência
            </h1>
            <p className="text-xs text-black/50 pt-0.5">
              21 SET 2026 - 11:12:21
            </p>
          </div>

          {/* Amount Box */}
          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs space-y-3">
            <div>
              <span className="text-xs text-black/50 block">Valor</span>
              <div className="text-3xl font-black text-black">
                R$ {formatCurrency(rawAmountCents || 1)}
              </div>
            </div>

            <div className="flex justify-between border-t border-black/5 pt-3 text-xs">
              <span className="text-black/50">Tipo de transferência</span>
              <span className="font-bold text-black">Pix</span>
            </div>

            <div className="flex justify-between border-t border-black/5 pt-3 text-xs">
              <span className="text-black/50">ID da transação</span>
              <span className="font-mono text-[11px] text-black">E18236120202609211412s16118a3bfc</span>
            </div>
          </div>

          {/* Destino & Origem */}
          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs space-y-4 text-xs">
            {/* Destino */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider">
                Destino
              </span>
              <p className="font-bold text-sm text-black">{selectedContact.fullName}</p>
              <p className="text-black/70">Instituição: {selectedAccount.bankName}</p>
              <p className="text-black/70">Chave Pix: {selectedAccount.pixKey}</p>
            </div>

            {/* Origem */}
            <div className="border-t border-black/5 pt-3 space-y-1">
              <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider">
                Origem
              </span>
              <p className="font-bold text-sm text-black">{user.fullName}</p>
              <p className="text-black/70">Instituição: NU PAGAMENTOS - IP</p>
              <p className="text-black/70">CPF: •••.746.484-••</p>
            </div>
          </div>

          {/* Legal Footer */}
          <div className="text-[10px] text-black/45 space-y-2 pt-2 px-1">
            <p>Nu Pagamentos S.A. - Instituição de Pagamento</p>
            <p>CNPJ 18.236.120/0001-58</p>
            <p className="font-mono">ID da transação: E18236120202609211412s16118a3bfc</p>
            <div className="pt-2 border-t border-black/10">
              <p>Estamos aqui para ajudar se você tiver alguma dúvida.</p>
              <button
                onClick={() => alert('Abrindo canal de ajuda')}
                className="text-[#820AD1] font-bold hover:underline cursor-pointer"
              >
                Me ajuda →
              </button>
              <p className="pt-1">
                Ouvidoria: 0800 887 0463 ou demais canais em nubank.com.br/contatos#ouvidoria (Atendimento das 8h às 18h em dias úteis).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Sheet */}
      {showShareSheet && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-fade-in select-none">
          <div className="flex-1" onClick={() => setShowShareSheet(false)} />

          <div className="bg-[#1c1c1e] text-white rounded-t-[28px] p-5 pb-8 space-y-4 animate-slide-up">
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-purple-300 border border-white/10">
                  PNG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Compartilhar comprovante</h4>
                  <span className="text-[10px] text-white/50">PNG • 292 KB</span>
                </div>
              </div>
              <button
                onClick={() => setShowShareSheet(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#2c2c2e] rounded-2xl divide-y divide-white/10 text-xs">
              <button
                onClick={() => {
                  setShowShareSheet(false);
                  navigator.clipboard?.writeText?.(
                    `Comprovante Pix Nubank: R$ ${formatCurrency(rawAmountCents || 1)} para ${selectedContact.fullName}`
                  );
                  alert('Comprovante copiado para a área de transferência!');
                }}
                className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-white/5 cursor-pointer"
              >
                <span>Copiar</span>
                <Copy className="w-4 h-4 text-white/50" />
              </button>
              <button
                onClick={() => {
                  setShowShareSheet(false);
                  alert('Comprovante salvo na galeria de fotos!');
                }}
                className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-white/5 cursor-pointer"
              >
                <span>Salvar Imagem</span>
                <Share className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
