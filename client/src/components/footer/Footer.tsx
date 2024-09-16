import { Link } from "react-router-dom";
import logo from "../../assets/images/salad-logo.png";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between px-4 text-white sm:flex-row bg-primary">
      <img className="w-32 h-32" src={logo} alt="logo" />
      <p className="self-center">
        ©2024 Salad Restaurant, tout droits réversés
      </p>
    </footer>
  );
}
