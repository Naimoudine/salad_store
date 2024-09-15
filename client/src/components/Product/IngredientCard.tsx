import type { Ingredient } from "../../pages/dashboard/Products";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <article className="flex flex-col w-40 h-40 gap-4 p-4 rounded-lg shadow-lg">
      <div
        className="w-full h-16"
        style={{
          background: `url('${ingredient?.url}') no-repeat center/contain`,
        }}
      />
      <p>
        <span className="font-semibold">Nom: </span>
        {ingredient?.name}
      </p>
      <p>
        {" "}
        <span className="font-semibold">Prix: </span>
        {ingredient?.price} €
      </p>
    </article>
  );
}
