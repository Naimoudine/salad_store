import { useLoaderData } from "react-router-dom";
import IngredientCard from "../../components/Product/IngredientCard";

export interface Ingredient {
  id: number;
  name: string;
  url: string;
  category: string;
  price: number;
  user_id?: number;
  created_at: string;
}

interface LoaderData {
  ingredients: Ingredient[];
}

export const loader = async () => {
  const [ingredientsData] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredients`, {
      credentials: "include",
    }),
  ]);
  if (!ingredientsData.ok) {
    throw new Error("Uknown Error while getting data");
  }
  const [ingredients] = await Promise.all([ingredientsData.json()]);
  return { ingredients };
};

export default function Products() {
  const { ingredients } = useLoaderData() as LoaderData;

  return (
    <section className="page">
      <h1 className="title">Nos produits</h1>
      <section className="mt-8">
        <h2 className="subtitle">Ingredients</h2>
        <div className="flex flex-wrap gap-8 mt-8">
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </section>
    </section>
  );
}
