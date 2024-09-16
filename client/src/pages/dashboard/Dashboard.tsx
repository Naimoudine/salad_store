import { Outlet } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";

export default function Dashboard() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <aside className="w-[15%]">
        <Navbar />
      </aside>
      <main className="flex-grow overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
