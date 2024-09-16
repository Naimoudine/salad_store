import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
function App() {
  return (
    <div className="relative flex flex-col justify-between w-full h-full">
      <Header>
        <Navbar />
      </Header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
