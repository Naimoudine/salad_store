import type { Salad } from "../../pages/dashboard/Products";

interface SaladCardProps {
  salad: Salad;
}

export default function SaladCard({ salad }: SaladCardProps) {
  return (
    <article className="flex flex-col w-56 gap-2 p-4 rounded-lg shadow-xl h-fit">
      <div
        className="w-full rounded-lg min-h-24"
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
        <span className="font-semibold">Prix: {salad.totalPrice} </span>€
      </p>
    </article>
  );
}
