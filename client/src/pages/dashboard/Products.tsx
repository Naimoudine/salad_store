import { useLoaderData } from "react-router-dom";
import IngredientCard from "../../components/Product/IngredientCard";
import SaladCard from "../../components/Product/SaladCard";

export interface Ingredient {
  id: number;
  name: string;
  url: string;
  category: string;
  price: number;
  user_id?: number;
  created_at: string;
}

export interface Salad {
  id: number;
  name: string;
  url: string;
  sauce: string;
  ingredient_prices: string;
  ingredients: string;
  user_id?: number;
  created_at: string;
}

interface LoaderData {
  ingredients: Ingredient[];
  salads: Salad[];
}

export const loader = async () => {
  try {
    const [ingredientsData, saladsData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/ingredients`, {
        credentials: "include",
      }),
      fetch(`${import.meta.env.VITE_API_URL}/api/salads`, {
        credentials: "include",
      }),
    ]);
    if (!ingredientsData.ok || !saladsData.ok) {
      throw new Error("Uknown Error while getting data");
    }
    const [ingredients, salads] = await Promise.all([
      ingredientsData.json(),
      saladsData.json(),
    ]);
    return { ingredients, salads };
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export default function Products() {
  const { ingredients, salads } = useLoaderData() as LoaderData;
  return (
    <section className="page">
      <h1 className="title">Nos produits</h1>
      <section className="mt-8">
        <h2 className="subtitle">Salads</h2>
        <div className="flex flex-wrap gap-8 mt-8">
          {salads.map((salad) => (
            <SaladCard key={salad.id} salad={salad} />
          ))}
        </div>
      </section>
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
