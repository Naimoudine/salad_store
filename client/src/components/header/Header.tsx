import type React from "react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  children: React.ReactNode;
}
export default function Header({ children }: HeaderProps) {
  const { pathname } = useLocation();
  return (
    <header
      className={pathname === "/" ? "absolute w-full sm:backdrop-blur-sm" : ""}
    >
      {children}
    </header>
  );
}
