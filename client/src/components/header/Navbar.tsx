import {
  Bars3BottomRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/salad-logo.png";
import { useCartStore } from "../../store";

interface NavbarProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setOpenModal }: NavbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const salads = useCartStore((s) => s.salads);
  return (
    <nav className="flex items-center justify-between px-4 py-2 ">
      <Link to="/">
        <img className="w-auto h-16" src={logo} alt="logo" />
      </Link>
      <ul
        className={
          pathname === "/"
            ? "hidden sm:flex items-center justify-center gap-4 text-white"
            : "hidden sm:flex items-center justify-center gap-4 text-black"
        }
      >
        <li>
          <NavLink className="nav-item" to="/personnaliser">
            Personnalises ta salade
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/nos-salades">
            Nos salades
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/a-propos">
            Qui sommes nous ?
          </NavLink>
        </li>
      </ul>
      <button
        className="items-center justify-center hidden gap-4 font-semibold text-white sm:flex bg-secondary hover:bg-secondary/70"
        type="button"
        aria-label="open cart"
        onClick={() => navigate("/commande")}
      >
        <ShoppingCartIcon className="text-white size-4" />
        {salads.length}
      </button>
      <button
        className="sm:hidden"
        type="button"
        aria-label="open menu"
        onClick={() => setOpenModal(true)}
      >
        <Bars3BottomRightIcon
          className={
            pathname === "/" ? "size-6 text-white" : "size-6 text-black"
          }
        />
      </button>
    </nav>
  );
}
