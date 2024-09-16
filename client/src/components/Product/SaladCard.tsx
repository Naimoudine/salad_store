import type { Salad } from "../../pages/dashboard/Products";

interface SaladCardProps {
  salad: Salad;
}

export default function SaladCard({ salad }: SaladCardProps) {
  const calculateFinalPrice = () => {
    let total = 0;

    if (salad.ingredient_prices) {
      const arrPrices = salad.ingredient_prices.split(",");
      for (const price of arrPrices) {
        total += Number(price);
      }
    }
    return total;
  };
  return (
    <article className="flex flex-col w-56 gap-2 p-4 rounded-lg shadow-lg h-fit">
      <div
        className="w-full min-h-24"
        style={{
          background: `url('${salad?.url}') no-repeat center/cover`,
        }}
      />
      <p className="font-semibold">{salad?.name}</p>
      <p className="font-semibold text-zinc-400">
        {salad?.ingredients}, {salad.sauce}
      </p>
      <p>
        {" "}
        <span className="font-semibold">Prix: {calculateFinalPrice()} </span>€
      </p>
    </article>
  );
}
