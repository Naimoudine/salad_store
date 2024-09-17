import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

interface NavModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavModal({ openModal, setOpenModal }: NavModalProps) {
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
              className="flex items-center justify-center w-full bg-secondary"
              type="button"
            >
              <ShoppingCartIcon className="text-white size-4" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
