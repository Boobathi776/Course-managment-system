import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPage } from "../routes/reactRoutes";
import { getUser } from "../store/selectors/overAllSelcetors";
import { logout } from "../store/slices/loginSlice";
import { fetchUser, type UserReturnType } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";
import { ageCalculator } from "../shared/functions/ageCalculator";

const Profile = () => {

  const dispatch = useAppDispatch();
    const navigate = useNavigate();
  useEffect(()=>{
    dispatch(fetchUser());
  },[]);
  
  function handleLogoutClick(): void {
    dispatch(logout());
    navigate(loginPage);
  }

  var user : UserReturnType | null = useSelector(getUser);

  return (
    <Box>
      <Typography>UserName : {user?.name}</Typography>
      <Typography>Email address : {user?.email}</Typography>
      <Typography>Role : {user?.isAdmin ? "Admin" : "User"}</Typography>
      <Typography>Date of birth : {new Date(user?.dateOfBirth ? user.dateOfBirth : new Date()).toLocaleDateString()}</Typography>
      <Typography>Age : {ageCalculator(new Date(user?.dateOfBirth ? user.dateOfBirth : new Date()))}</Typography>
      <Button variant="contained" color="error" onClick={handleLogoutClick}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
