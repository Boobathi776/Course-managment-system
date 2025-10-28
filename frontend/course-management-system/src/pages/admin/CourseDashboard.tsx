import { Box, Button, Stack } from "@mui/material";
import CourseList from "../../features/course/Admin/CourseListAdmin";
import { useNavigate } from "react-router-dom";
import { courseForm } from "../../routes/reactRoutes";
import Sidebar from "../../shared/components/Sidebar";

const CourseDashboard = () => {
  const navigateTo = useNavigate();

  const handleAddCourseClick = () => {
    navigateTo(courseForm);
  };

  return (
      <Box width="100%">
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
      </Box>
  );
};
export default CourseDashboard;
