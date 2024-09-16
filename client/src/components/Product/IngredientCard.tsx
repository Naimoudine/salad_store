import type { Ingredient } from "../../pages/dashboard/Products";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <article className="flex flex-col w-48 h-48 gap-2 p-4 rounded-lg shadow-lg">
      <div
        className="w-full h-16"
        style={{
          background: `url('${ingredient?.url}') no-repeat center/contain`,
        }}
      />
      <p className="font-semibold">{ingredient?.name}</p>
      <p className="font-semibold text-zinc-400">{ingredient?.category}</p>
      <p>
        {" "}
        <span className="font-semibold">Prix: </span>
        {ingredient?.price} €
      </p>
    </article>
  );
}
