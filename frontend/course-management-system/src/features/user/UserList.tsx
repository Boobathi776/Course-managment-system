import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CenteredTableCell,
  CenteredTableCellHeading,
} from "../../shared/components/CenteredTableCell";
import { useAppDispatch } from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import {
  deleteUser,
  fetchAllUsers,
  setEditingUser,
  type UserReturnType,
} from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../store/selectors/overAllSelcetors";
import { useNavigate } from "react-router-dom";
import { userForm } from "../../routes/reactRoutes";
import ConfirmPopUp from "../../shared/components/ConfirmPopUp";
import { Delete, Edit } from "@mui/icons-material";

const UserList = () => {

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const users = useSelector(getAllUsers);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [deletingUserId, setDeleteUserId] = useState<string>("");

  const deleteQuestion = "Do you want to delete a User ?";

  const onDeleteConfirm = useCallback(() => {
    deletingUserId && dispatch(deleteUser(deletingUserId));
    setIsDeleteConfirmOpen(false);
  }, [deletingUserId]);
  
  const handleEditClick = (user: UserReturnType): void => {
    dispatch(setEditingUser(user));
    navigateTo(userForm);
  };

  const handleDeleteClick = (userId: string): void => {
    setDeleteUserId(userId);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <>
        <TableContainer component={Paper} elevation={4} sx={{width:"100%"}}>
          <Table>
            <TableHead>
              <TableRow>
                <CenteredTableCellHeading>Name</CenteredTableCellHeading>
                <CenteredTableCellHeading>Mail</CenteredTableCellHeading>
                <CenteredTableCellHeading>
                  Date of birth
                </CenteredTableCellHeading>
                <CenteredTableCellHeading>Is admin</CenteredTableCellHeading>
                <CenteredTableCellHeading>Is active</CenteredTableCellHeading>
                <CenteredTableCellHeading>Action</CenteredTableCellHeading>
              </TableRow>
            </TableHead>

            <TableBody>
              {users &&
                users.map((u) => {
                  return (
                    <TableRow key={u.id} hover>
                      <CenteredTableCell>{u.name}</CenteredTableCell>
                      <CenteredTableCell>{u.email}</CenteredTableCell>
                      <CenteredTableCell>
                        {new Date(u.dateOfBirth).toLocaleDateString()}
                      </CenteredTableCell>
                      <CenteredTableCell>
                        {u.isAdmin ? "Admin" : "User"}
                      </CenteredTableCell>
                      <CenteredTableCell>
                        {u.isActive ? (
                          <Chip label="Active" color="success" />
                        ) : (
                          <Chip label="Inactive" color="error" />
                        )}
                      </CenteredTableCell>
                      <CenteredTableCell>
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ mr: 2,borderRadius:10 }}
                          onClick={() => handleEditClick(u)}
                        >
                         <Edit fontSize="small" sx={{mr:1}} />Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{borderRadius:10}}
                          onClick={() => handleDeleteClick(u.id)}
                        >
                          <Delete fontSize="small" sx={{mr:1}} /> Delete
                        </Button>
                      </CenteredTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

      {deletingUserId.length > 0 && (
        <ConfirmPopUp
          isOpen={isDeleteConfirmOpen}
          setIsOpen={setIsDeleteConfirmOpen}
          question={deleteQuestion}
          onConfirm={onDeleteConfirm}
        ></ConfirmPopUp>
      )}

    </>
  );
};

export default UserList;
