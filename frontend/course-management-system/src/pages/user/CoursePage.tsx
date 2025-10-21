import { Box, CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const CoursePage = () => {
  return (
    <div>
      <Typography variant="button">Course page</Typography>
      {/* <Box sx={{ display: "flex", backgroundColor:"grey[2]",justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress />
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress size={50} thickness={4} color="primary" />
      </Box>
    </div>
  );
};

export default CoursePage;
