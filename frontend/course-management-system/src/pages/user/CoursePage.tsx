import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import CourseList from "../../features/course/user/CourseList";
import { useAppDispatch } from "../../store/store";
import { fetchUser } from "../../store/slices/userSlice";
import { fetchCourses } from "../../store/slices/courseSlice";

const CoursePage = () => {

  const dispatch = useAppDispatch();

    useEffect(()=>{
      dispatch(fetchUser());
      dispatch(fetchCourses());
    },[]);
    
  return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* <CircularProgress size={50} thickness={4} color="primary" /> */}
        <CourseList/>
      </Box>
  );
};

export default CoursePage;
