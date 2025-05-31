import Header from "../components/Header/Header.jsx";
import {Outlet} from "react-router";
import Footer from "../components/Footer/Footer.jsx";

export default function MainLayout() {
  return (
    <div>
      <Header/>
      <main className="flex flex-col gap-4 p-4 bg-gray-100">
        <div className="container mx-auto flex flex-col gap-4">
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  )
}