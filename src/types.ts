export interface Contact {
  id: string;
  name: string;
  fullName: string;
  bank: string;
  cpf: string;
  fullCpf?: string;
  phone?: string;
  email?: string;
  keyType: 'CPF' | 'E-mail' | 'Telefone' | 'Aleatória';
  initials: string;
  isRecent: boolean;
}

export interface Transaction {
  id: string;
  type: 'pix_transfer' | 'deposit' | 'scheduled' | 'card_purchase';
  recipientName: string;
  recipientBank: string;
  recipientCpf: string;
  amount: number;
  date: string;
  formattedDate: string;
  status: 'completed' | 'scheduled';
  scheduledDate?: string;
  message?: string;
}

export interface HistoryTransaction {
  id: string;
  title: string;
  time: string;
  category: 'Débito' | 'Pix' | 'Transferência';
  amount: number;
  isPositive?: boolean;
  dateGroup: string;
  iconType: 'bag' | 'pix' | 'transfer';
}

export interface Caixinha {
  id: string;
  name: string;
  amount: number;
  customAmountDisplay?: string;
  totalLiquidoDisplay?: string;
  rendimentoDisplay?: string;
  goal?: number;
  image: string;
  rendimento: string;
}

export interface UserAccount {
  name: string;
  fullName: string;
  printedCardName?: string;
  profilePhoto?: string;
  agency: string;
  accountNumber: string;
  balance: number;
  customBalanceDisplay?: string;
  isBalanceVisible: boolean;
  streetModeActive: boolean;
  securityScore: number;
  totalCaixinhas: number;
  phonePlanActive: boolean;
  creditCardInvoice?: number;
  creditCardLimit?: number;
  cardLastDigits?: string;
  cardVirtualDigits?: string;
  cardExpiry?: string;
}

export type ScreenId =
  | 'splash'
  | 'face_id_modal'
  | 'home'
  | 'account_details'
  | 'nucel'
  | 'profile_menu'
  | 'help'
  | 'protection_center'
  | 'pix_area'
  | 'pix_transfer'
  | 'pix_scanner'
  | 'pix_copia_cola'
  | 'pix_agendado_intro'
  | 'meus_cartoes'
  | 'caixinhas';
