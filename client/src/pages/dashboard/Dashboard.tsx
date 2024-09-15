import { Outlet } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";

export default function Dashboard() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <aside>
        <Navbar />
      </aside>
      <main className="overflow-y-scroll ">
        <Outlet />
      </main>
    </div>
  );
}
