import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavModal from "./components/NavModal";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col justify-between w-full h-full">
      <NavModal openModal={openModal} setOpenModal={setOpenModal} />
      <Header>
        <Navbar setOpenModal={setOpenModal} />
      </Header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
