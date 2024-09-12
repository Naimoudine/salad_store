import {
  Bars3BottomRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/salad-logo.png";

export default function Navbar() {
  const { pathname } = useLocation();
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
          <NavLink className="nav-item" to="/custom">
            Personnalise ta salade
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/salades">
            Nos salades
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/about">
            Qui sommes nous ?
          </NavLink>
        </li>
      </ul>
      <button
        className="hidden rounded-lg sm:block bg-secondary"
        type="button"
        aria-label="open cart"
      >
        <ShoppingCartIcon className="text-white size-4" />
      </button>
      <button className="sm:hidden" type="button" aria-label="open menu">
        <Bars3BottomRightIcon
          className={
            pathname === "/" ? "size-6 text-white" : "size-6 text-black"
          }
        />
      </button>
    </nav>
  );
}
