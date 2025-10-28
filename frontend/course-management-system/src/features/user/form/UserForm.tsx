import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { CenterPaper } from "../../../shared/components/CenterPaper";
import { FormBox } from "../../../shared/components/FormBox";
import {
  addNewUser,
  setEditingUser,
  updateUser,
  type UserInputType,
  type UserReturnType,
} from "../../../store/slices/userSlice";
import { useAppDispatch } from "../../../store/store";
import {
  newUserFormShema,
  updateUserFormSchema,
  type NewUserFormType,
  type UpdateUserFormType,
} from "./userFormSchema";
import { useSelector } from "react-redux";
import { getEditingUser } from "../../../store/selectors/overAllSelcetors";

export type UpdateUserType = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  isActive: boolean;
  isAdmin: boolean;
};

const UserForm = () => {
  const dispatch = useAppDispatch();

  const editingUser: UserReturnType | null = useSelector(getEditingUser);

  const defaultValueForNewUser: NewUserFormType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: null,
    isActive: false,
    roleId: false,
  };

  const defaultValueForEdit: UpdateUserFormType = {
    name: editingUser ? editingUser.name : "",
    email: editingUser ? editingUser.email : "",
    dateOfBirth: editingUser
      ? new Date(editingUser.dateOfBirth)
      : new Date(),
    isActive: editingUser ? editingUser.isActive : false,
    roleId: editingUser ? editingUser.isAdmin : false,
  };

  const defaultValueForForm = editingUser !== null ? defaultValueForEdit : defaultValueForNewUser;

  console.log(defaultValueForForm);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<NewUserFormType | UpdateUserFormType>({
    resolver: zodResolver(
      editingUser !== null ? updateUserFormSchema : newUserFormShema
    ),
    defaultValues: defaultValueForForm,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);

    if (editingUser) {

      const mappedUser: UpdateUserType = {
        id: editingUser.id,
        name: formData.name,
        email: formData.email,
        isActive: formData.isActive,
        isAdmin: formData.roleId,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString().split("T")[0],
      };

      var updateResponse = await dispatch(updateUser(mappedUser));

      if (updateUser.fulfilled.match(updateResponse)) {
        console.log(updateResponse.payload);
        dispatch(setEditingUser(null));
        reset(defaultValueForNewUser);
      } else {
        console.log(updateResponse.payload);
      }

    } else {
      const dateOfBirth = formData.dateOfBirth || new Date();
      const mappedUser: UserInputType = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isActive: formData.isActive,
        isAdmin: formData.roleId,
        dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      };

      var response = await dispatch(addNewUser(mappedUser));

      if (addNewUser.fulfilled.match(response)) {
        console.log(response.payload);
        reset(defaultValueForForm);
      } else {
        console.log(response.payload);
      }
    }
  };

  return (
    <Box sx={{width:"100%",height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <CenterPaper sx={{ m: "auto", mb: 5 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          User form
        </Typography>
        <FormBox component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  size="small"
                  label="Name*"
                  placeholder="Enter user name"
                  {...field}
                  inputRef={(el) => field.ref(el)}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                ></TextField>
              );
            }}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  size="small"
                  label="Mail*"
                  placeholder="Enter user mail address"
                  {...field}
                  inputRef={(el) => field.ref(el)}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                ></TextField>
              );
            }}
          />

          {editingUser === null && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    type="password"
                    fullWidth
                    size="small"
                    label="Password*"
                    placeholder="Enter user password"
                    {...field}
                    inputRef={(el) => field.ref(el)}
                    error={!!(errors as any).password}
                    helperText={(errors as any).password?.message}
                  ></TextField>
                );
              }}
            />
          )}

          {editingUser === null && (
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    type="password"
                    fullWidth
                    size="small"
                    label="Confirm Password*"
                    placeholder="Enter user password again"
                    {...field}
                    inputRef={(el) => field.ref(el)}
                    error={!!(errors as any).confirmPassword}
                    helperText={(errors as any).confirmPassword?.message}
                  ></TextField>
                );
              }}
            />
          )}

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => {
              return (
                <FormControl fullWidth error={!!errors.dateOfBirth}>
                  <FormLabel>Date of birth</FormLabel>
                  <DatePicker
                    className="date-picker"
                    dateFormat="dd-MM-yyyy"
                    selected={field.value}
                    onChange={(newDate) => field.onChange(newDate)}
                    showMonthDropdown
                    showYearDropdown
                    scrollableMonthYearDropdown
                  ></DatePicker>
                  <FormHelperText>{errors.dateOfBirth?.message}</FormHelperText>
                </FormControl>
              );
            }}
          />

          <Stack direction="row">
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    label="Is Admin"
                    checked={field.value===true}
                    onChange={() => field.onChange(!field.value)}
                    control={<Checkbox />}
                  ></FormControlLabel>
                );
              }}
            />

              <Controller
              name="isActive"
              control={control}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    label="Is Active"
                    checked = {field.value===true}
                    onChange={() => field.onChange(!field.value)}
                    control={<Checkbox />}
                  ></FormControlLabel>
                );
              }}
            />
          </Stack>

          <Button type="submit" variant="contained">
            {editingUser ? "Update" : "Submit"}
          </Button>
        </FormBox>
      </CenterPaper>
    </Box>
  );
};

export default UserForm;
