import { Box, Button } from "@mui/material";
import CourseList from "../../features/course/CourseList";
import { useNavigate } from "react-router-dom";
import { courseForm } from "../../routes/reactRoutes";

const CourseDashboard = () => {
  const navigateTo = useNavigate();

  const handleAddCourseClick = ()=> {
    navigateTo(courseForm);
  }

  return (
    <>

      <Box p={4} display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="success"
          onClick={handleAddCourseClick}
        >
          Add Course
        </Button>
      </Box>

      <CourseList />
      
    </>
  );
};
export default CourseDashboard;
