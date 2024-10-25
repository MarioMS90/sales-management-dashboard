import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

const sellers = [
  {
    id: 'INV001',
    name: 'Liam Johnson',
    email: 'liam.johnson@email.com',
    avatar: '/avatars/01.png',
  },
  {
    id: 'INV002',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    avatar: '/avatars/02.png',
  },
  {
    id: 'INV003',
    name: 'Noah Brown',
    email: 'noah.brown@email.com',
    avatar: '/avatars/03.png',
  },
  {
    id: 'INV004',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@email.com',
    avatar: '/avatars/04.png',
  },
  {
    id: 'INV005',
    name: 'James Garcia',
    email: 'james.garcia@email.com',
    avatar: '/avatars/05.png',
  },
];

export default function SellersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map(({ id, name, email, avatar }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>
              <Image
                src={avatar}
                alt="Avatar"
                className="mr-8 rounded-full"
                width={34}
                height={34}
              />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell className="text-right">{email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
