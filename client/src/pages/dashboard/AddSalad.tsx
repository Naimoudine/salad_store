import { Form, redirect, useLoaderData } from "react-router-dom";

interface Ingredient {
  id: number;
  name: string;
  url: string;
  price: string;
  category: string;
  user_id?: number;
  created_at: string;
}

export const loader = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/ingredients`,
      {
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("unknow error while getting data");
    }
    const data = await response.json();
    return data as Ingredient[];
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/salads`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        url: formData.get("url"),
        sauce: formData.get("sauce"),
        ingredients: [
          formData.get("proteine"),
          formData.get("base"),
          formData.get("fromage"),
          formData.get("topping"),
        ],
      }),
      credentials: "include",
    });
    if (response.status !== 201) {
      throw new Error("unknown error while creating ingredient");
    }
    return redirect("/dashboard/produits");
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export default function AddSalad() {
  const ingredients = useLoaderData() as Ingredient[];
  return (
    <div className="page">
      <h1 className="title">Ajouter une salade</h1>
      <Form className="flex flex-col w-full gap-8 mt-16" method="post">
        <input
          className="text-lg"
          type="text"
          name="name"
          id="name"
          placeholder="Entrer le nom de la salade"
        />
        <input
          className="text-lg"
          type="text"
          name="url"
          id="url"
          placeholder="Entrer l'url de l'image"
        />
        <div className="flex flex-wrap items-center justify-start gap-8">
          <section>
            <h3 className="font-semibold">Base :</h3>
            <select
              className="px-4 py-2 mt-4 border rounded-lg border-zinc-400"
              name="base"
            >
              {ingredients
                .filter((ingredient) => ingredient.category === "base")
                .map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
            </select>
          </section>
          <section>
            <h3 className="font-semibold">Protéine :</h3>
            <select
              className="px-4 py-2 mt-4 border rounded-lg border-zinc-400"
              name="proteine"
            >
              {ingredients
                .filter((ingredient) => ingredient.category === "protéine")
                .map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
            </select>
          </section>
          <section>
            <h3 className="font-semibold">Fromage :</h3>
            <select
              className="px-4 py-2 mt-4 border rounded-lg border-zinc-400"
              name="fromage"
            >
              {ingredients
                .filter((ingredient) => ingredient.category === "fromage")
                .map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
            </select>
          </section>
          <section>
            <h3 className="font-semibold">Topping :</h3>
            <select
              className="px-4 py-2 mt-4 border rounded-lg border-zinc-400"
              name="topping"
            >
              {ingredients
                .filter((ingredient) => ingredient.category === "topping")
                .map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
            </select>
          </section>
        </div>
        <input
          className="text-lg"
          type="text"
          name="sauce"
          id="sauce"
          placeholder="Entrer une sauce si il y en a une"
        />
        <button className="font-semibold text-white bg-secondary" type="submit">
          Ajouter
        </button>
      </Form>
    </div>
  );
}
