import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "../components/header/Header";

const Layout = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
