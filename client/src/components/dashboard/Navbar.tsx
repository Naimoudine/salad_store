import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/salad-logo.png";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (auth) {
      setAuth({ id: 0, username: "" });
    }
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="flex flex-col items-center justify-between w-full h-full px-4 py-6 w-fit bg-primary">
      <div>
        <Link to="/dashboard">
          <img className="h-24" src={logo} alt="logo" />
        </Link>
        <ul className="flex flex-col gap-8 mt-16 text-sm">
          <li>
            <NavLink className="dashboard-nav-item" to="/dashboard">
              Nos produits
            </NavLink>
          </li>
          <li>
            <NavLink
              className="dashboard-nav-item"
              to="/dashboard/ajout-salade"
            >
              Ajouter une salade
            </NavLink>
          </li>
          <li>
            <NavLink
              className="dashboard-nav-item"
              to="/dashboard/ajout-ingredient"
            >
              Ajouter un ingrédient
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        className="flex items-center justify-center gap-2 text-sm font-semibold text-black bg-white hover:text-white hover:bg-red-600"
        type="button"
        aria-label="déconnexion"
        onClick={handleLogOut}
      >
        <ArrowLeftEndOnRectangleIcon className="text-black size-6" />
        Déconnexion
      </button>
    </nav>
  );
}
