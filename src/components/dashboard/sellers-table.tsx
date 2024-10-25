import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchSellers } from '@/lib/data';
import Image from 'next/image';

export default async function SellersTable() {
  const sellers = await fetchSellers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Seller ID</TableHead>
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
