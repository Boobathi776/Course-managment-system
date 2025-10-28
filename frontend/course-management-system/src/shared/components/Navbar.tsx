import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { adminCourseDashBoard, adminUserDashBoard, coursePage, enrollmentPage, loginPage, profilePage } from "../../routes/reactRoutes";
import { tokenDecoder } from "../functions/tokenDecocer";
import { getAccessToken } from "../../store/selectors/overAllSelcetors";

const Navbar = () => {
  const adminPages = [
    {
      label: "User dashboard",
      endPoint: adminUserDashBoard,
    },
    {
      label: "Course dashboard",
      endPoint: adminCourseDashBoard,
    },
  ];

  const userPages = [
    {
      label: "Course",
      endPoint: coursePage,
    },
    {
      label: "Enrollments",
      endPoint: enrollmentPage,
    },
  ];

  const accessToken = useSelector(getAccessToken);
  const token = accessToken ? tokenDecoder(accessToken) : null;
 

  const pages = token?.role === "Admin" ? adminPages : userPages;

  return (
    <AppBar>
      <Toolbar>
        <Typography fontSize={30} sx={{ flexGrow: 1 }}>
          CMS
        </Typography>

        {pages &&
          pages.map((e) => {
            return (
              <NavLink key={e.label} to={e.endPoint}>
                {({ isActive }) => (
                  <Button
                    sx={{
                      color: isActive ? "black" : "white",
                      backgroundColor: isActive ? "white" : "transparent",
                    }}
                  >
                    {e.label}
                  </Button>
                )}
              </NavLink>
            );
          })}

        <NavLink to={accessToken ?profilePage: loginPage}>
          {({ isActive }) => (
            <Button
              sx={{
                color: isActive ? "black" : "white",
                backgroundColor: isActive ? "white" : "transparent",
              }}
            >
             {accessToken ? "Profile" : "Login"}
            </Button>
          )}
        </NavLink>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
