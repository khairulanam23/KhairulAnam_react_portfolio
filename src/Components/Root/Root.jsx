import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const Root = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-10 md:pt-10 lg:pt-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default Root;