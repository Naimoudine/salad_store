import { Link } from "react-router-dom";
import { useCartStore } from "../store";

export default function ConfirmOrder() {
  const cleanCart = useCartStore((s) => s.clean);
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-28">
      <p>Votre commande a bien été confirmée. </p>
      <Link
        className="px-4 py-2 font-semibold text-white rounded-lg bg-primary hover:bg-primary/70"
        to="/"
        onClick={() => cleanCart()}
      >
        Acceuil
      </Link>
    </div>
  );
}
