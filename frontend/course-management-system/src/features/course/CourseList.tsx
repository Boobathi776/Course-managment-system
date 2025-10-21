import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CenteredTableCell,
  CenteredTableCellHeading,
} from "../../shared/components/CenteredTableCell";
import {
  fetchCourses,
  getAllCourses,
  setEditingCourse,
  type Course,
} from "../../store/slices/courseSlice";
import { store, useAppDispatch } from "../../store/store";
import { courseForm } from "../../routes/reactRoutes";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFetching(true);
    dispatch(fetchCourses())
      .unwrap()
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  let courses: Course[] = useSelector(getAllCourses);

  const navigator = useNavigate();
  
  const handleEditClick = (c: Course): void => {
    dispatch(setEditingCourse(c));
    navigator(courseForm);
  };

  return (
    <>
      <TableContainer component={Paper} elevation={4} sx={{ width: "100vw" }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <CenteredTableCellHeading>Name</CenteredTableCellHeading>
              <CenteredTableCellHeading>Duration</CenteredTableCellHeading>
              <CenteredTableCellHeading>Minimum age</CenteredTableCellHeading>
              <CenteredTableCellHeading>Start date</CenteredTableCellHeading>
              <CenteredTableCellHeading>Action</CenteredTableCellHeading>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses &&
              courses.map((c) => {
                return (
                  <TableRow key={c.id}>
                    <CenteredTableCell>{c.name}</CenteredTableCell>
                    <CenteredTableCell>{c.courseDuration}</CenteredTableCell>
                    <CenteredTableCell>
                      {c.minimumAgeRequired}
                    </CenteredTableCell>
                    <CenteredTableCell>
                      {new Date(c.startDate).toLocaleDateString()}
                    </CenteredTableCell>
                    <CenteredTableCell>
                      <Button
                        variant="contained"
                        color="primaryButton"
                        sx={{ mr: 2 }}
                        onClick={() => handleEditClick(c)}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" color="primaryButton">
                        Delete
                      </Button>
                    </CenteredTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {isFetching && (
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
      )}
    </>
  );
};

export default CourseList;
