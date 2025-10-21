import { Controller, useForm } from "react-hook-form";
import { FormBox } from "../../../shared/components/FormBox";
import { courseFromSchema, type CourseFromScemaType } from "./courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CenterPaper } from "../../../shared/components/CenterPaper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, type RootState } from "../../../store/store";
import { addNewCourse, setEditingCourse, updateCourse } from "../../../store/slices/courseSlice";
import { useSelector } from "react-redux";
import { date } from "zod";

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
    setFocus,
    reset,
    handleSubmit,
  } = useForm<CourseFromScemaType>({
    resolver: zodResolver(courseFromSchema),
    defaultValues: currentEditingCouse || defaultValue,
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const dispatch = useAppDispatch();


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
    <CenterPaper sx={{ m: "auto", mb: 5 }}>
      <FormBox component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">Course form</Typography>

        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                fullWidth
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
  );
};

export default CourseForm;
