import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCartStore } from "../store";

interface NavModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavModal({ openModal, setOpenModal }: NavModalProps) {
  const salads = useCartStore((s) => s.salads);
  const navigate = useNavigate();
  return (
    <div
      className={
        openModal
          ? "absolute z-50 flex items-center justify-center w-screen h-screen bg-light-gray sm:hidden"
          : "hidden"
      }
    >
      <button
        className="absolute z-60 top-5 right-4"
        type="button"
        aria-label="close nav modal"
        onClick={() => setOpenModal(false)}
      >
        <XMarkIcon className="size-6" />
      </button>
      <nav className="text-lg font-semibold">
        <ul className="flex flex-col gap-8">
          <li>
            <Link
              className="nav-item"
              to="/personnaliser"
              onClick={() => setOpenModal(false)}
            >
              Personnalises ta salade
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/nos-salades"
              onClick={() => setOpenModal(false)}
            >
              Nos salades
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/a-propos"
              onClick={() => setOpenModal(false)}
            >
              Qui sommes nous ?
            </Link>
          </li>
          <li>
            <button
              className="flex items-center justify-center w-full gap-4 font-semibold text-white bg-secondary hover:bg-secondary/70"
              type="button"
              onClick={() => navigate("/commande")}
            >
              <ShoppingCartIcon className="text-white size-4" />
              {salads.length}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
