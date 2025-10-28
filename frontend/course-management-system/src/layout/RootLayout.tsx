import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";
import Sidebar from "../shared/components/Sidebar";
import { useSelector } from "react-redux";
import { getAccessToken } from "../store/selectors/overAllSelcetors";
import { tokenDecoder } from "../shared/functions/tokenDecocer";

const RootLayout = () => {
  const accessToken = useSelector(getAccessToken);
  var decodedToken = accessToken && tokenDecoder(accessToken);

  return (
    <>
      <Navbar />
      <Box sx={{ width: "100%", marginTop: 9, minHeight: "84vh" }}>
        {decodedToken && decodedToken.role === "Admin" ? (
          <Stack direction="row" m={0}>
            <Sidebar></Sidebar>
            <Outlet />
          </Stack>
        ) : (
          <Outlet />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default RootLayout;
