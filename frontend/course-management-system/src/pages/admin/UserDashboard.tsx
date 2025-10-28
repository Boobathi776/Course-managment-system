import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserList from "../../features/user/UserList";
import { userForm } from "../../routes/reactRoutes";

const UserDashboard = () => {
  const navigateTo = useNavigate();

  const handleAddUserClick = () => {
    navigateTo(userForm);
  };

  return (
    <>
      <Box p={4} display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="success"
          onClick={handleAddUserClick}
        >
          Add User
        </Button>
      </Box>
      <UserList />
    </>
  );
};

export default UserDashboard;
