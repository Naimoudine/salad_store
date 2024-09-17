import { useLoaderData } from "react-router-dom";
import type { Salad } from "./dashboard/Products";
import { useCartStore } from "../store";

export const loader = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/salads`);
    if (!response.ok) {
      throw new Error("Unknown error while getting salads");
    }
    const data = response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export default function Salads() {
  const salads = useLoaderData() as Salad[];
  const saladsCart = useCartStore((s) => s.salads);
  const addSalad = useCartStore((s) => s.addSalad);
  return (
    <div className="page">
      <h1 className="title">Nos Salades</h1>
      <div className="flex flex-wrap gap-8 mt-8">
        {salads.map((salad) => (
          <article
            className="flex flex-col w-full gap-4 p-4 rounded-lg shadow-xl sm:w-56 h-fit"
            key={salad.id}
          >
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
            <p className="font-semibold">{salad?.totalPrice} €</p>
            <button
              className="text-white bg-secondary hover:bg-secondary/70"
              type="button"
              onClick={() => addSalad(salad)}
            >
              Commander
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
