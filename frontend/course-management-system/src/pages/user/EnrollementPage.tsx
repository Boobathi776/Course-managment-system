import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import emptyEnrollmentImage from "../../assets/empty-enrollment-img.jpg";
import EnrollmentCard from "../../features/course/user/EnrollmentCard";
import {
  getCoursesForUser,
  getEnrollments
} from "../../store/selectors/overAllSelcetors";
import type { Course } from "../../store/slices/courseSlice";
import {
  fetchEnrollments,
  type EnrollmentResponse,
} from "../../store/slices/enrollmentSlice";
import { useAppDispatch } from "../../store/store";

const EnrollementPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, []);

  const enrollments: EnrollmentResponse[] = useSelector(getEnrollments);
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
      {enrollments.length>0 ? (<Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={5}>
        {enrollments.map((e,index) => {
            return (
              <EnrollmentCard
                key={index}
                course={courses.find((course) => course.id === e.courseId)}
                enrollment={e}
              />
            );
          })}
      </Box>) : (
        <Box>
          <Box component="img" src={emptyEnrollmentImage} alt="Empty enrollment image" width={400} height="auto" sx={{objectFit:"contain"}}>
          </Box>
          </Box>
      )} 
    </Box>
  );
};

export default EnrollementPage;
