import Sidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh grow overflow-y-auto">
      <Sidebar />
      <main className="grow overflow-y-auto bg-background p-8 pb-20">{children}</main>
    </div>
  );
}
