import Image from 'next/image';

const sales = [
  {
    id: 'INV001',
    name: 'Liam Johnson',
    email: 'liam.johnson@email.com',
    amount: 1250,
    avatar: '/avatars/01.png',
  },
  {
    id: 'INV002',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    amount: 50,
    avatar: '/avatars/02.png',
  },
  {
    id: 'INV003',
    name: 'Noah Brown',
    email: 'noah.brown@email.com',
    amount: 399,
    avatar: '/avatars/03.png',
  },
  {
    id: 'INV004',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@email.com',
    amount: 75,
    avatar: '/avatars/04.png',
  },
  {
    id: 'INV005',
    name: 'James Garcia',
    email: 'james.garcia@email.com',
    amount: 120,
    avatar: '/avatars/05.png',
  },
];

export default function RecentSales() {
  return (
    <div className="space-y-8 px-4">
      {sales.map(({ id, name, email, amount, avatar }) => (
        <div key={id} className="items-center md:flex">
          <Image
            src={avatar}
            alt="Avatar"
            className="mr-8 hidden rounded-full md:block"
            width={34}
            height={34}
          />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="ml-auto font-medium">{`${amount}€`}</div>
        </div>
      ))}
    </div>
  );
}
