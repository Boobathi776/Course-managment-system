import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar";
import { Footer } from "../shared/components/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Box sx={{marginTop:10}}>
        <Outlet />
      </Box>
      <Footer/>
    </>
  );
};

export default RootLayout;
