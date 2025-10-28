import { Box, Button, Typography } from "@mui/material";
import { logout } from "../store/slices/loginSlice";
import { useSelector } from "react-redux";
import { tokenDecoder } from "../shared/functions/tokenDecocer";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { loginPage } from "../routes/reactRoutes";
import { getAccessToken } from "../store/selectors/overAllSelcetors";

const Profile = () => {
  const accessToken = useSelector(getAccessToken);
  const token = accessToken ? tokenDecoder(accessToken) : null;

  const dispatch = useAppDispatch();
    const navigate = useNavigate();

  function handleLogoutClick(): void {
    dispatch(logout());
    navigate(loginPage);
  }

  return (
    <Box>
      <Typography>UserName : {token?.name}</Typography>
      <Typography>Email address : {token?.email}</Typography>
      <Typography>Role : {token?.role}</Typography>
      <Button variant="contained" color="error" onClick={handleLogoutClick}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
