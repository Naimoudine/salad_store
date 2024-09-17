import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useCartStore } from "../store";
import type { Ingredient } from "./dashboard/Products";

export const loader = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/ingredients`,
    );
    if (!response.ok) {
      throw new Error("unknwon error while getting ingredients");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export default function Custom() {
  const [customName, setCustomName] = useState<string>();
  const [customSauce, setCustomSauce] = useState<string>();
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>([]);
  const [customPrice, setCustomPrice] = useState<number>();
  const ingredients = useLoaderData() as Ingredient[];

  const addSalad = useCartStore((s) => s.addSalad);

  const handleClick = (ingredient: Ingredient) => {
    const exists = customIngredients.find((el) => el.id === ingredient.id);
    const categoryExists = customIngredients.some(
      (el) => el.category === ingredient.category,
    );
    if (exists) {
      setCustomIngredients((prev) => prev.filter((el) => el.id !== exists.id));
    } else if (!exists && !categoryExists) {
      setCustomIngredients((prev) => [...prev, ingredient]);
    }
  };

  const handleValidate = () => {
    if (customName && customPrice) {
      addSalad({
        name: customName,
        ingredients: customIngredients,
        sauce: customSauce,
        url: "https://res.cloudinary.com/djccw5t9o/image/upload/v1726584923/salad_store/q0aqqt0olgxxscksed1j.png",
        totalPrice: customPrice,
      });
    }
    setCustomIngredients([]);
    setCustomName("");
    setCustomPrice(0);
    setCustomSauce("");
  };

  useEffect(() => {
    const totalPrice = customIngredients.reduce(
      (acc, ingredient) => Number(acc) + Number(ingredient.price),
      0,
    );
    setCustomPrice(totalPrice);
  }, [customIngredients]);

  return (
    <section className="page">
      <h1 className="title">Personnaliver votre salade</h1>
      <input
        className="mt-8 input-form"
        type="text"
        name="name"
        id="name"
        value={customName}
        placeholder="Nom de la salade"
        onChange={(e) => setCustomName(e.target.value)}
        required
      />
      <section className="mt-8">
        <h2 className="subtitle">Base</h2>
        <div className="flex flex-wrap items-center justify-start gap-8 mt-4">
          {ingredients
            .filter((ingredient) => ingredient.category === "base")
            .map((ingredient) => (
              <button
                className={
                  customIngredients.find((el) => el.id === ingredient.id)
                    ? "w-32 h-32 p-4 shadow-xl border-2 border-primary"
                    : "w-32 h-32 p-4 shadow-xl"
                }
                key={ingredient.id}
                type="button"
                style={{
                  background: `url('${ingredient.url}') no-repeat center/contain`,
                }}
                onClick={() => handleClick(ingredient)}
              />
            ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="subtitle">Protéine</h2>
        <div className="flex flex-wrap items-center justify-start gap-8 mt-4">
          {ingredients
            .filter((ingredient) => ingredient.category === "protéine")
            .map((ingredient) => (
              <button
                className={
                  customIngredients.find((el) => el.id === ingredient.id)
                    ? "w-32 h-32 p-4 shadow-xl border-2 border-primary"
                    : "w-32 h-32 p-4 shadow-xl"
                }
                key={ingredient.id}
                type="button"
                style={{
                  background: `url('${ingredient.url}') no-repeat center/contain`,
                }}
                onClick={() => handleClick(ingredient)}
              />
            ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="subtitle">Fromage</h2>
        <div className="flex flex-wrap items-center justify-start gap-8 mt-4">
          {ingredients
            .filter((ingredient) => ingredient.category === "fromage")
            .map((ingredient) => (
              <button
                className={
                  customIngredients.find((el) => el.id === ingredient.id)
                    ? "w-32 h-32 p-4 shadow-xl border-2 border-primary"
                    : "w-32 h-32 p-4 shadow-xl"
                }
                key={ingredient.id}
                type="button"
                style={{
                  background: `url('${ingredient.url}') no-repeat center/contain`,
                }}
                onClick={() => handleClick(ingredient)}
              />
            ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="subtitle">Topping</h2>
        <div className="flex flex-wrap items-center justify-start gap-8 mt-4">
          {ingredients
            .filter((ingredient) => ingredient.category === "topping")
            .map((ingredient) => (
              <button
                className={
                  customIngredients.find((el) => el.id === ingredient.id)
                    ? "w-32 h-32 p-4 shadow-xl border-2 border-primary"
                    : "w-32 h-32 p-4 shadow-xl"
                }
                key={ingredient.id}
                type="button"
                style={{
                  background: `url('${ingredient.url}') no-repeat center/contain`,
                }}
                onClick={() => handleClick(ingredient)}
              />
            ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="subtitle">Sauce</h2>
        <select
          className="px-4 py-2 mt-4 border rounded-lg border-zinc-400"
          name="sauce"
          id="sauce"
          value={customSauce}
          onChange={(e) => setCustomSauce(e.currentTarget.value)}
          required
        >
          <option value="">Pas de sauce</option>
          <option value="vinaigrette">vinaigrette</option>
        </select>
      </section>
      {
        <button
          className="block mt-8 font-semibold text-white bg-secondary"
          type="button"
          onClick={handleValidate}
        >
          Valider
        </button>
      }
    </section>
  );
}
