import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
function App() {
  return (
    <div className="relative">
      <Header>
        <Navbar />
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
