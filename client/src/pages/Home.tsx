import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import background from "../assets/images/landing-bg.avif";
import Tag from "../components/Tag";
import type { Category } from "./dashboard/AddIngredient";
import type { Ingredient } from "./dashboard/Products";

export const loader = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/ingredients`,
    );
    if (!response.ok) {
      throw new Error("Unknown error while getting ingredients");
    }
    const data = response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Ingredient[]>([]);
  const ingredients = useLoaderData() as Ingredient[];

  useEffect(() => {
    const uniqueArray: Category[] = Object.values(
      ingredients.reduce<Record<string, Category>>((acc, obj) => {
        acc[obj.category] = obj;
        return acc;
      }, {}),
    );

    setCategories(uniqueArray);
  }, [ingredients]);

  useEffect(() => {
    setFiltered(
      ingredients.filter((ingredient) => ingredient.category === "base"),
    );
  }, [ingredients]);

  return (
    <div className="pb-20">
      <div
        className="w-full h-[45dvh] md:h-[65dvh]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <section className="wrapper lg:max-w-[70%] mx-auto">
        <h1 className="mt-8 text-xl font-bold sm:text-2xl md:text-4xl">
          Découvrez + de 120 combinaisons possibles pour créer la salade qui
          vous correspond, grâce à notre large choix d’ingrédients.
        </h1>
        <div className="flex flex-wrap items-center justify-start gap-4 mt-8 md:gap-8">
          {categories.map((category) => (
            <Tag
              key={category.category}
              ingredients={ingredients}
              setFiltered={setFiltered}
            >
              {category.category}
            </Tag>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-16 mt-8">
          {filtered.map((ingredient) => (
            <div
              className="flex items-center justify-center w-full h-56 p-6 rounded-lg shadow-xl sm:w-56"
              key={ingredient.id}
              title={ingredient.name}
            >
              <img
                className="w-40 h-40 sm:object-contain sm:aspect-square"
                src={ingredient.url}
                alt=""
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
