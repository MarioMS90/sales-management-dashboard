export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type Seller = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Invoice = {
  id?: string;
  status: InvoiceStatus;
  amount: number;
  paymentMethod: InvoicePaymentMethod;
  sellerId: string;
  sellerName?: string;
  createdAt: Date;
};

export enum InvoicePaymentMethod {
  CreditCard = 'Credit Card',
  BankTransfer = 'Bank Transfer',
  PayPal = 'PayPal',
}

export enum InvoiceStatus {
  Pending = 'Pending',
  Paid = 'Paid',
}

export type Database = {
  users: User;
  sellers: Seller;
  invoices: Invoice;
};
