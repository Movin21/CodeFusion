import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../pages/Home/components/Navbar";
import Footer from "../../pages/Home/components/Footer";

const HomeRootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeRootLayout;
