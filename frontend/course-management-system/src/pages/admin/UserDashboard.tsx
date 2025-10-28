import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserList from "../../features/user/UserList";
import { userForm } from "../../routes/reactRoutes";
import Sidebar from "../../shared/components/Sidebar";

const UserDashboard = () => {
  const navigateTo = useNavigate();

  const handleAddUserClick = () => {
    navigateTo(userForm);
  };

  return (
      <Box width="100%">
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
      </Box>
  );
};

export default UserDashboard;
