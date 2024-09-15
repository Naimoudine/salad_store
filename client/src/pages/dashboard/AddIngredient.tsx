import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";

interface Category {
  category: string;
}

export const loader = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/ingredients/categories`,
      {
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("unknow error while getting data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/ingredients`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          url: formData.get("url"),
          price: formData.get("price"),
          category: formData.get("category"),
          employee_id: undefined,
        }),
        credentials: "include",
      },
    );
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

export default function AddIngredient() {
  const [categories, setCategories] = useState<Category[]>([]);

  const data = useLoaderData() as Category[];

  useEffect(() => {
    const uniqueArray: Category[] = Object.values(
      data.reduce<Record<string, Category>>((acc, obj) => {
        acc[obj.category] = obj;
        return acc;
      }, {}),
    );

    setCategories(uniqueArray);
  }, [data]);

  return (
    <div className="page">
      <h1 className="title">Ajouter un ingredient</h1>
      <Form className="flex flex-col w-full gap-8 mt-16" method="post">
        <input
          className="text-lg"
          type="text"
          name="name"
          id="name"
          placeholder="Entrer le nom de l'ingrédient"
        />
        <input
          className="text-lg"
          type="text"
          name="url"
          id="url"
          placeholder="Entrer l'url de l'image"
        />
        <input
          className="text-lg"
          type="number"
          name="price"
          id="price"
          placeholder="Entrer le prix"
        />
        <select
          className="px-4 py-2 border rounded-lg w-fit border-zinc-400"
          name="category"
          id="category"
        >
          <option value="">category</option>
          {categories.map((category) => (
            <option key={category.category}>{category.category}</option>
          ))}
        </select>
        <button className="font-semibold text-white bg-secondary" type="submit">
          Ajouter
        </button>
      </Form>
    </div>
  );
}
