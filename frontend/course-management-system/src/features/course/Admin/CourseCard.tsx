import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import type { Course } from "../../../store/slices/courseSlice";

type CardProps = {
  course: Course;
};

const CourseCard = ({ course }: CardProps) => {
  return (
    <Card>
      <CardHeader sx={{ fontSize: 20 }}>{course.name}</CardHeader>
      <CardContent>
        <Typography>
            Course duration : {
            course.courseDuration
        }
        </Typography>
        <Typography>
             Duration : {
            course.courseDuration
        }
        </Typography>
        <Typography>
            Start date : {
            course.startDate.toLocaleDateString()
        }
        </Typography>
        <Typography>
            Age : {course.minimumAgeRequired}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
