import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";
import type { Course } from "../../../store/slices/courseSlice";
import { getTimeAgo } from "../../../shared/functions/getTimeAgo";

type CourseCardProps = {
  course: Course;
  age : number;
};

const CourseCard = ({ course,age }: CourseCardProps) => {

  
  return (
    <Card sx={{ width: 350 ,height:250 }}>
      <CardContent>
        <Typography variant="h6">{course.name}</Typography>
        <Typography>Start date : {new Date(course.startDate).toLocaleDateString()}</Typography>
        <Typography>Course duration : {course.courseDuration}</Typography>
        <Typography>Required age : {course.minimumAgeRequired}</Typography>
        <Typography variant="subtitle2">Created {getTimeAgo(course.createdOn)}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primaryButton" disabled={course.minimumAgeRequired>=age}>Enroll</Button>
       {course.minimumAgeRequired>=age && <Typography variant="subtitle2"> Note*: Based on your age this course is not accessible </Typography> }
      </CardActions>
    </Card>
  );
};

export default CourseCard;
