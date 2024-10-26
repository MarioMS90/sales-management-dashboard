import { generateInvoices, generateSellers } from './utils';

const user = {
  name: 'User',
  email: 'user@gmail.com',
  password: '123456',
};

const sellers = generateSellers(30);

const invoices = generateInvoices(1200, sellers);

export { user, sellers, invoices };
