import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../../features/course/user/CourseCard";
import { ageCalculator } from "../../shared/functions/ageCalculator";
import {
  getCoursesForUser,
  getUser,
} from "../../store/selectors/overAllSelcetors";
import type { Course } from "../../store/slices/courseSlice";
import { fetchCoursesForUsers } from "../../store/slices/enrollmentSlice";
import { useAppDispatch } from "../../store/store";

const CoursePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoursesForUsers());
  }, []);

  const user = useSelector(getUser);

  let dateofBirth = user ? user.dateOfBirth : new Date();

  const age = ageCalculator(dateofBirth);

  const courses: Course[] = useSelector(getCoursesForUser);

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
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
        {courses &&
          courses.map((course) => {
            return <CourseCard key={course.id} course={course} age={age} />;
          })}
      </Box>
    </Box>
  );
};

export default CoursePage;
