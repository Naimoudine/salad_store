import { Link } from "react-router-dom";

export default function ConfirmOrder() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-28">
      <p>Votre commande a bien été confirmée. </p>
      <Link
        className="px-4 py-2 font-semibold text-white rounded-lg bg-primary hover:bg-primary/70"
        to="/"
      >
        Acceuil
      </Link>
    </div>
  );
}
