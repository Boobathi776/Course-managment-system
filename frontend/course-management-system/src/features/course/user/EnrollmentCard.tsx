import { Box, Button, Card, CardActions, CardContent, LinearProgress, Typography } from '@mui/material'
import type { Course } from '../../../store/slices/courseSlice';
import { getTimeAgo } from '../../../shared/functions/getTimeAgo';
import { removeEnrollment, type EnrollmentResponse } from '../../../store/slices/enrollmentSlice';
import { useAppDispatch } from '../../../store/store';
import { ellipseString } from '../../../shared/functions/ellipseString';

type EnrollmentProps = {
    course : Course | undefined,
    enrollment : EnrollmentResponse | undefined
};

const EnrollmentCard = ({course,enrollment}:EnrollmentProps) => {
    
    const dispath = useAppDispatch();

    function handleRemoveClick(courseId: number): void {
        dispath(removeEnrollment(courseId));
    }

  return course && enrollment && (
      <Box>
      <Card
        sx={{
          width: 350,
          height: 220,
          borderRadius: 4,
          background: "linear-gradient(135deg, #ffffff, #f8fafc)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #e2e8f0",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          },
        }}
      >
        <CardContent sx={{ px: 3, pt: 2 }}>
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

          <Typography variant="body2" color="text.secondary">
            📅 <b>Start:</b> {new Date(course.startDate).toLocaleDateString()}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            ⏱<b>Duration:</b> {course.courseDuration}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            🎯 <b>Required age:</b> {course.minimumAgeRequired}+
          </Typography>

          <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
            ✅ Enrolled {getTimeAgo(enrollment.enrolledOn)}
          </Typography>

          {/* Optional Progress Bar for UX flair
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{
              mt: 1.5,
              borderRadius: 2,
              height: 6,
              backgroundColor: "#e2e8f0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#3b82f6",
              },
            }}
          /> */}
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 3,
            pb: 2,
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 2.5,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#dc2626",
                boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
              },
            }}
            onClick={() => handleRemoveClick(enrollment.courseId)}
          >
            Unenroll
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default EnrollmentCard
