'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useScrollPagination from '@/hooks/useScrollPagination';
import { fetchSellersAction } from '@/lib/actions';
import { Seller } from '@/types/db-types';
import Image from 'next/image';
import { useRef } from 'react';

export default function SellersTable({
  initialSellers,
  limit,
}: {
  initialSellers: Seller[];
  limit: number;
}) {
  const ref = useRef(null);
  const [sellers] = useScrollPagination<Seller>({
    fetchDataAction: fetchSellersAction,
    initialData: initialSellers,
    limit,
    refToObserve: ref,
  });

  return (
    <Table className="sellers-table">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Seller ID</TableHead>
          <TableHead>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map(({ id, name, email, avatar }, index) => (
          <TableRow key={id} ref={index === sellers.length - 10 ? ref : null}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>
              <Image
                src={avatar}
                alt={`Avatar of ${name}`}
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
