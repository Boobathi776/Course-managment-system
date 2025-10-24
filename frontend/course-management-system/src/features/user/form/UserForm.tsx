import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { CenterPaper } from "../../../shared/components/CenterPaper";
import { FormBox } from "../../../shared/components/FormBox";
import { userFormShema, type UserFormType } from "./userFormSchema";

const defaultValue: UserFormType = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: null,
  isActive: false,
  roleId: false,
};

const UserForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register
  } = useForm<UserFormType>({
    resolver: zodResolver(userFormShema),
    defaultValues: defaultValue,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = (formData: UserFormType) => {
    console.log(formData);
  };

  return (
    <CenterPaper sx={{ m: "auto", mb: 5 }}>
      <Typography variant="h5" textAlign="center">
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
                error={!!errors.password}
                helperText={errors.password?.message}
              ></TextField>
            );
          }}
        />

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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              ></TextField>
            );
          }}
        />

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
                <FormHelperText>
                    {errors.dateOfBirth?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />

        <Stack direction="row">
          <FormControlLabel
            label="Is Admin"
            {...register("roleId")}
            control={<Checkbox />}
          ></FormControlLabel>

          <FormControlLabel
            label="Is Active"
            {...register("isActive")}
            control={<Checkbox />}
          ></FormControlLabel>

        </Stack>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormBox>
    </CenterPaper>
  );
};

export default UserForm;
