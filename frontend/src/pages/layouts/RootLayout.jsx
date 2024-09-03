import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../shared/header";
import Footer from "../../shared/footer";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
