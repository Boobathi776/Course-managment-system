import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { ellipseString } from "../../../shared/functions/ellipseString";
import { getTimeAgo } from "../../../shared/functions/getTimeAgo";
import { getCoursesForUser, getEnrollments } from "../../../store/selectors/overAllSelcetors";
import type { Course } from "../../../store/slices/courseSlice";
import { enrollCourse } from "../../../store/slices/enrollmentSlice";
import { useAppDispatch } from "../../../store/store";

type CourseCardProps = {
  course: Course;
  age : number;
};

const CourseCard = ({ course,age }: CourseCardProps) => {

  const dispatch = useAppDispatch();

  const courses = useSelector(getCoursesForUser);
  const enrollments = useSelector(getEnrollments);
  const matchedCourse = courses[courses.findIndex(c=>c.id===course.id)];

  const isEnrolledCourse = enrollments.some(e=>e.courseId===matchedCourse.id);
  const isInValidAge = course.minimumAgeRequired>age;
  const isDisabled = enrollments.length>=3 || isInValidAge || isEnrolledCourse ;

  const isAlreadyEnrolledCoursesOverlap = ()=>{
       return enrollments.some(e=>{
         const matchedCourse = courses.find(c=>c.id===e.courseId);
         if(matchedCourse)
         {
            const startDate = matchedCourse.startDate;
            const endDate =startDate.setMonth(startDate.getMonth()+matchedCourse.courseDuration);
            return enrollments.some(e=>{
              const matchedCourse2 = courses.find(c=>c.id===e.courseId);
              if(matchedCourse2)
              {
                const anotherCourseStartDate = matchedCourse2.startDate;
                const anotherCourseEndDate =anotherCourseStartDate.setMonth(anotherCourseStartDate.getMonth()+matchedCourse2.courseDuration);
                return e.courseId!==matchedCourse.id && anotherCourseStartDate >= startDate  && endDate>=anotherCourseEndDate;
              } 
            })
         }
        else 
        {
          return false;
        }
      });
  };
  

  function handleEnrollClick(id: number): void {

      const matchedCourse = courses.find(c=>c.id===id);

      if(matchedCourse)
      {
        const startDate = new Date(matchedCourse.startDate);
        const endDate =startDate.setMonth(startDate.getMonth()+matchedCourse.courseDuration);

        const overlapedEnrollments = enrollments.filter(e=>{
          const enMatchedCourse = courses.find(c=>c.id===id);
          if(enMatchedCourse)
          {
            const enStartDate = new Date(enMatchedCourse.startDate);
            const enEndDate =enStartDate.setMonth(enStartDate.getMonth()+enMatchedCourse.courseDuration);
            return startDate<= enStartDate && enEndDate>=endDate ||
                   startDate <= enStartDate && enEndDate>=endDate ||
                   startDate >= enStartDate && enEndDate <= endDate;
          }
        });

        console.log(overlapedEnrollments.length);
        if(overlapedEnrollments.length<3)
        {
           dispatch(enrollCourse(id));
        }

      }
      else
      {
        console.log("unable to add an course");
      }

      // if(enrollments.some(e=>(courses.find(c=>c.id===e.courseId)?.startDate)===(matchedCourse?.startDate)))
      // {
      //   console.log("You can't enroll this course");
      // }
      // else 
      // {
      //   dispatch(enrollCourse(id));
      // }
  }


  return (
    <Box
    >
      <Card
        sx={{
          width: 350,
          height: 230,
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            title={course.name}
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: 1,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {ellipseString(course.name, 30)}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            📅 <b>Start:</b> {new Date(course.startDate).toLocaleDateString()}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            ⏱ <b>Duration:</b> {course.courseDuration}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            🎯 <b>Min Age:</b> {course.minimumAgeRequired}+
          </Typography>

          <Typography variant="caption" color="text.disabled">
            🕒 Created {getTimeAgo(course.createdOn)}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            p: 2,
            pt: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          {!isDisabled && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 2.5,
              }}
              disabled={isDisabled}
              onClick={() => handleEnrollClick(course.id)}
            >
              Enroll
            </Button>
          )}

          {isInValidAge && (
            <Chip
              color="error"
              size="small"
              label={`Age restricted (${course.minimumAgeRequired}+ only)`}
            />
          )}

          {enrollments.length >= 3 &&
            !isEnrolledCourse &&
            !isInValidAge && (
              <Typography
                variant="caption"
                color="error"
                sx={{ textAlign: "center" }}
              >
                <span style={{fontWeight:"bold"}}>Note*</span> Already enrolled in 3 courses
              </Typography>
            )}

          {isEnrolledCourse && (
            <Chip color="success" size="small" label="Enrolled" />
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default CourseCard;
