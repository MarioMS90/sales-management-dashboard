export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="px-5">
      <section className="flex h-dvh items-center justify-center">{children}</section>
    </main>
  );
}
