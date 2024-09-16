import type { ReactNode, SetStateAction } from "react";
import type { Ingredient } from "../pages/dashboard/Products";

interface TagProps {
  children: ReactNode;
  ingredients: Ingredient[];
  setFiltered: React.Dispatch<SetStateAction<Ingredient[]>>;
}

export default function Tag({ children, ingredients, setFiltered }: TagProps) {
  const handleFilter = () => {
    setFiltered(
      ingredients.filter((ingredient) => ingredient.category === children),
    );
  };

  return (
    <button
      type="button"
      aria-label="filter category"
      className={
        "px-4 py-2 text-sm font-semibold border-2 rounded-full w-fit border-primary"
      }
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}
