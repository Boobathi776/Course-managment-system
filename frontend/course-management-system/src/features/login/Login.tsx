import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  adminCourseDashBoard,
  coursePage,
  homePage,
  registerPage,
} from "../../routes/reactRoutes";
import { CenterPaper } from "../../shared/components/CenterPaper";
import { FormBox } from "../../shared/components/FormBox";
import { tokenDecoder } from "../../shared/functions/tokenDecocer";
// import { loginUser } from "../../store/slices/loginSlice";
import { store, type AppDispatch } from "../../store/store";
import { loginSchema, type LoginFormType } from "./loginSchema";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/loginSlice";

const defaulValue: LoginFormType = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaulValue,
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = async (formData: LoginFormType) => {
    console.log(formData);
    var response = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(response)) {
      reset(defaulValue);
      const state = store.getState();
      const token = state.login.accessToken;
      var decodedToken = token ? tokenDecoder(token) : null;
      if (decodedToken)
        decodedToken.role === "Admin"
          ? navigator(adminCourseDashBoard)
          : navigator(coursePage);
      else navigator(homePage);
    } else if (loginUser.rejected.match(response)) {
      console.log(response.payload);
    }
  };

  const handleFormError = () => {
    const firstErrorField = Object.keys(errors)[0] as keyof LoginFormType;
    setFocus(firstErrorField);
  };

  function handleClick(): void {
    navigator(registerPage);
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CenterPaper elevation={4}>
        <FormBox
          component="form"
          onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
        >
          <Typography fontSize={30}>Sign in</Typography>

          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  label="Email*"
                  placeholder="Enter your email address"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  autoFocus
                  {...field}
                  inputRef={(el) => field.ref(el)}
                />
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
                  label="Password*"
                  placeholder="Enter your email password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  inputRef={(el) => field.ref(el)}
                  {...field}
                />
              );
            }}
          />

          <Button type="submit" variant="contained" color="primaryButton">
            Submit
          </Button>

          <FormHelperText>
            If you don't have an account ?{" "}
            <Button size="small" onClick={handleClick}>
              register
            </Button>
          </FormHelperText>
        </FormBox>
      </CenterPaper>
    </Box>
  );
};

export default Login;
