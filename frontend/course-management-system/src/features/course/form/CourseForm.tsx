import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CenterPaper } from "../../../shared/components/CenterPaper";
import { FormBox } from "../../../shared/components/FormBox";
import { addNewCourse, setEditingCourse, updateCourse } from "../../../store/slices/courseSlice";
import { type RootState, type AppDispatch } from "../../../store/store";
import { courseFromSchema, type CourseFromScemaType } from "./courseSchema";

const defaultValue: CourseFromScemaType = {
  name: "",
  courseDuration: 0,
  minimumAgeRequired: 0,
  startDate: null,
};

const CourseForm = () => {

    const editingCourse = useSelector(
    (state: RootState) => state.course.editingCourse
  );

  let currentEditingCouse = editingCourse;

  if(editingCourse)
  {
      currentEditingCouse = {...editingCourse,startDate:new Date(editingCourse.startDate)}
  }

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CourseFromScemaType>({
    resolver: zodResolver(courseFromSchema),
    defaultValues: currentEditingCouse || defaultValue,
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const dispatch = useDispatch<AppDispatch>();


  const onSubmit = async (formData: CourseFromScemaType) => {
    console.log(formData);
    if (editingCourse) {
      var response = await dispatch(
        updateCourse({
          id: editingCourse.id,
          course: {...editingCourse,...formData},
        })
      );

      if(updateCourse.fulfilled.match(response))
      {
          console.log(response.payload);
          dispatch(setEditingCourse(null));
          reset(defaultValue);
      }
      else
      {
        console.log(response.payload);
      }
    } else {
      var repsonse = await dispatch(addNewCourse(formData));
      if (addNewCourse.fulfilled.match(repsonse)) {
        console.log(repsonse.payload);
        reset(defaultValue);
      } else if (addNewCourse.rejected.match(repsonse)) {
        console.log(repsonse.payload);
      }
    }
  };

  return (
    <Box sx={{width:"100%",height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <CenterPaper sx={{ m: "auto", mb: 5 }} elevation={10}>
      <FormBox component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">Course form</Typography>

        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Name*"
                placeholder="Enter the course name"
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
                {...field}
                inputRef={(el) => field.ref(el)}
              ></TextField>
            );
          }}
        />

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => {
            return (
              <FormControl error={!!errors.startDate} fullWidth>
                <FormLabel>Start date*</FormLabel>
                <DatePicker
                  selected={field.value}
                  onChange={(newDate) => field.onChange(newDate)}
                  yearDropdownItemNumber={30}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Choose the start date"
                  scrollableMonthYearDropdown
                  className="date-picker"
                ></DatePicker>
                <FormHelperText>{errors.startDate?.message}</FormHelperText>
              </FormControl>
            );
          }}
        />

        <Controller
          name="courseDuration"
          control={control}
          render={({ field }) => {
            return (
              <TextField
              size="small"
                {...field}
                fullWidth
                type="number"
                label="Duration*"
                placeholder="Enter the course duration"
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.courseDuration}
                helperText={errors.courseDuration?.message}
                inputRef={(el) => field.ref(el)}
              ></TextField>
            );
          }}
        />

        <Controller
          name="minimumAgeRequired"
          control={control}
          render={({ field }) => {
            return (
              <TextField
              size="small"
                fullWidth
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                type="number"
                label="Minimum age*"
                placeholder="Enter the minimum age required"
                error={!!errors.minimumAgeRequired}
                helperText={errors.minimumAgeRequired?.message}
                inputRef={(el) => field.ref(el)}
              ></TextField>
            );
          }}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormBox>
    </CenterPaper>
    </Box>
  );
};

export default CourseForm;
