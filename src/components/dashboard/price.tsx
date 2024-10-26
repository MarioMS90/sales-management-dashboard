export default function Price({ amount, currency = '€' }: { amount: number; currency?: string }) {
  const formattedPrice = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span>
      {formattedPrice} {currency}
    </span>
  );
}
