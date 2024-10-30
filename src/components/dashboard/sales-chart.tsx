'use client';

import { TotalSalesByMonth } from '@/lib/data';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function SalesChart({ sales }: { sales: TotalSalesByMonth[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sales}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            `${value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}€`
          }
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}
