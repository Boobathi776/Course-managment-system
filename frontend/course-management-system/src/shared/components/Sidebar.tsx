import {
    Box,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Typography
} from "@mui/material";
import { customTheme } from "../theme/customTheme";
import { NavLink, useNavigate } from "react-router-dom";
import { adminCourseDashBoard, adminUserDashBoard, courseForm, userForm } from "../../routes/reactRoutes";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../store/selectors/overAllSelcetors";
import { tokenDecoder } from "../functions/tokenDecocer";

const Sidebar = () => {
  const navigateTo = useNavigate();


  return (
    <Box
      component={Paper}
      elevation={3}
      position="sticky"
      top={70}
      width="20%"
      height={700}
      mr={2}
      bgcolor={customTheme.palette.primary.main}
      color={customTheme.palette.primary.contrastText}
    >
      <List>
        <Typography variant="subtitle1" ml={1}>Dashboard</Typography>
        <NavLink to={adminCourseDashBoard}>
          {
            ({isActive})=><ListItemButton onClick={()=>navigateTo(adminCourseDashBoard)} sx={{backgroundColor:isActive ? "white" : ""}}><ListItem>Course dashboard</ListItem></ListItemButton>
          }
        </NavLink>
        <ListItemButton onClick={()=>navigateTo(courseForm)}><ListItem>Course form</ListItem></ListItemButton>
        <ListItemButton onClick={()=>navigateTo(adminUserDashBoard)}><ListItem>User dashboard</ListItem></ListItemButton>
        <ListItemButton onClick={()=>navigateTo(userForm)}><ListItem>User form</ListItem></ListItemButton>
      </List>
    </Box>
  )};

export default Sidebar;
