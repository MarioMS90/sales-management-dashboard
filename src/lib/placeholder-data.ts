import { getInvoices } from './utils';

const user = {
  name: 'User',
  email: 'user@gmail.com',
  password: '123456',
};

const sellers = [
  {
    id: '1000',
    name: 'Liam Johnson',
    email: 'liam.johnson@email.com',
    avatar: '/avatars/01.png',
  },
  {
    id: '1001',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    avatar: '/avatars/02.png',
  },
  {
    id: '1002',
    name: 'Noah Brown',
    email: 'noah.brown@email.com',
    avatar: '/avatars/03.png',
  },
  {
    id: '1003',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@email.com',
    avatar: '/avatars/04.png',
  },
  {
    id: '1004',
    name: 'James Garcia',
    email: 'james.garcia@email.com',
    avatar: '/avatars/05.png',
  },
];

const invoices = getInvoices(sellers);

export { user, sellers, invoices };
