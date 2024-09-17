import { createContext, useEffect, useState } from "react";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";

export interface Category {
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
  const userId = JSON.parse(localStorage.getItem("user") || "{}");
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
          employeeId: userId.id,
        }),
        credentials: "include",
      },
    );
    if (response.status !== 201) {
      throw new Error("unknown error while creating ingredient");
    }
    return redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export default function AddIngredient() {
  const [categories, setCategories] = useState<Category[]>([]);

  const data = useLoaderData() as Category[];

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
          required
        />
        <input
          className="text-lg"
          type="text"
          name="url"
          id="url"
          placeholder="Entrer l'url de l'image"
          required
        />
        <input
          className="text-lg"
          type="number"
          name="price"
          id="price"
          placeholder="Entrer le prix"
          required
        />
        <select
          className="px-4 py-2 border rounded-lg w-fit border-zinc-400"
          name="category"
          id="category"
          required
        >
          <option value="">category</option>
          {categories.map((category) => (
            <option key={category.category}>{category.category}</option>
          ))}
        </select>
        <button
          className="font-semibold text-white bg-secondary disabled:bg-gray-400"
          type="submit"
          disabled={isSubmitting}
        >
          Ajouter
        </button>
      </Form>
    </div>
  );
}
