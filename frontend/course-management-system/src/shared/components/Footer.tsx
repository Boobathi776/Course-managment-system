import { Box, Typography, Link, Grid, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        mt: 5,
        py: 6,
        px: { xs: 3, sm: 6 },
      }}
    >
      <Grid container spacing={4}>
        {/* About Section */}
        <Grid sx={{gridTemplateColumns:30}}>
          <Typography variant="h6" gutterBottom>
            My Company
          </Typography>
          <Typography variant="body2">
            We provide the best courses and content to help you grow your career and skills.
          </Typography>
        </Grid>

        {/* Links Section */}
        <Grid>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link href="#" underline="hover" color="inherit">
              Home
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Courses
            </Link>
            <Link href="#" underline="hover" color="inherit">
              About
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Contact
            </Link>
          </Stack>
        </Grid>

        {/* Social Section */}
        <Grid >
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="facebook" color="inherit" size="large">
              <Facebook />
            </IconButton>
            <IconButton aria-label="twitter" color="inherit" size="large">
              <Twitter />
            </IconButton>
            <IconButton aria-label="instagram" color="inherit" size="large">
              <Instagram />
            </IconButton>
            <IconButton aria-label="linkedin" color="inherit" size="large">
              <LinkedIn />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box textAlign="center" mt={4}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
