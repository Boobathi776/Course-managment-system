import { ArrowDownwardSharp, ArrowUpwardSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { courseForm } from "../../routes/reactRoutes";
import {
  CenteredTableCell,
  CenteredTableCellHeading,
} from "../../shared/components/CenteredTableCell";
import ConfirmPopUp from "../../shared/components/ConfirmPopUp";
import { search } from "../../shared/functions/search";
import { sort } from "../../shared/functions/sortFunction";
import {
  deleteCourse,
  fetchCourses,
  setEditingCourse,
  type Course,
} from "../../store/slices/courseSlice";
import { useAppDispatch } from "../../store/store";
import { grey } from "@mui/material/colors";
import { getAllCourses } from "../../store/selectors/overAllSelcetors";

const CourseList = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [sortOptions, setSortOptions] = useState<{
    key: keyof Course | null;
    order: "asc" | "desc";
  }>({
    key: null,
    order: "asc",
  });

  const [searchFilter, setSearchFilter] = useState<{
    key: keyof Course | null;
    keyword: string | "";
  }>({
    key: null,
    keyword: "",
  });

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

  const deleteQuestion = "Do you want to delete a course?";
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [deletingCourseId, setDeletingCourseId] = useState<number | null>();

  const onDeleteConfirm = useCallback(() => {
    deletingCourseId && dispatch(deleteCourse(deletingCourseId));
    setIsDeleteConfirmOpen(false);
  }, [deletingCourseId]);

  const handleDeleteClick = (id: number) => {
    setIsDeleteConfirmOpen(true);
    setDeletingCourseId(id);
  };

  const handleSortClick = (selectedKey: keyof Course) => {
    setSortOptions({
      key: selectedKey,
      order: sortOptions.order === "asc" ? "desc" : "asc",
    });
  };

  let filteredSortedCourses;

  if (sortOptions.key && searchFilter.key) {
    const sortedCourses = sort(courses, sortOptions.key, sortOptions.order);
    filteredSortedCourses = search(
      sortedCourses,
      searchFilter.key,
      searchFilter.keyword
    );
  } else if (sortOptions.key && !searchFilter.key) {
    filteredSortedCourses = sort(courses, sortOptions.key, sortOptions.order);
  } else if (searchFilter.key && !sortOptions.key) {
    filteredSortedCourses = search(
      courses,
      searchFilter.key,
      searchFilter.keyword
    );
  } else {
    filteredSortedCourses = courses;
  }
  
  return (
    <>
      <TableContainer component={Paper} elevation={4} sx={{ width: "100%",backgroundColor:grey[100] }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <CenteredTableCellHeading>
                Name
                <IconButton onClick={() => handleSortClick("name")}>
                  {sortOptions.order === "asc" && sortOptions.key === "name" ? (
                    <ArrowDownwardSharp />
                  ) : (
                    <ArrowUpwardSharp />
                  )}
                </IconButton>
              </CenteredTableCellHeading>
              <CenteredTableCellHeading>
                Duration
                <IconButton onClick={() => handleSortClick("courseDuration")}>
                  {sortOptions.order === "asc" &&
                  sortOptions.key === "courseDuration" ? (
                    <ArrowDownwardSharp />
                  ) : (
                    <ArrowUpwardSharp />
                  )}
                </IconButton>
              </CenteredTableCellHeading>
              <CenteredTableCellHeading>
                Minimum age
                <IconButton
                  onClick={() => handleSortClick("minimumAgeRequired")}
                >
                  {sortOptions.order === "asc" &&
                  sortOptions.key === "minimumAgeRequired" ? (
                    <ArrowDownwardSharp />
                  ) : (
                    <ArrowUpwardSharp />
                  )}
                </IconButton>
              </CenteredTableCellHeading>
              <CenteredTableCellHeading>
                Start date
                <IconButton onClick={() => handleSortClick("startDate")}>
                  {sortOptions.order === "asc" &&
                  sortOptions.key === "startDate" ? (
                    <ArrowDownwardSharp />
                  ) : (
                    <ArrowUpwardSharp />
                  )}
                </IconButton>
              </CenteredTableCellHeading>
              <CenteredTableCellHeading>Action</CenteredTableCellHeading>
            </TableRow>

            <TableRow>
              <CenteredTableCell>
                <TextField
                  size="small"
                  type="search"
                  placeholder="Search by name"
                  value={searchFilter.key === "name" ? searchFilter.keyword :""}
                  onChange={(e) =>
                    setSearchFilter({ key: "name", keyword: e.target.value })
                  }
                ></TextField>
              </CenteredTableCell>
              <CenteredTableCell>
                <TextField
                  size="small"
                  type="search"
                  placeholder="Search by duration"
                  value={searchFilter.key === "courseDuration" ? searchFilter.keyword :""}
                  onChange={(e) =>
                    setSearchFilter({ key: "courseDuration", keyword: e.target.value })
                  }
                ></TextField>
              </CenteredTableCell>
              <CenteredTableCell>
                <TextField
                  size="small"
                  type="search"
                  value={searchFilter.key === "minimumAgeRequired" ? searchFilter.keyword :""}
                  onChange={(e) =>
                    setSearchFilter({ key: "minimumAgeRequired", keyword: e.target.value })
                  }
                ></TextField>
              </CenteredTableCell>
              <CenteredTableCell>
                <TextField
                  size="small"
                  type="search"
                  value={searchFilter.key === "startDate" ? searchFilter.keyword :""}
                  onChange={(e) =>
                    setSearchFilter({ key: "startDate", keyword: e.target.value })
                  }
                ></TextField>
              </CenteredTableCell>
            </TableRow>

          </TableHead>

          <TableBody>
            {filteredSortedCourses &&
              filteredSortedCourses.map((c) => {
                return (
                  <TableRow key={c.id} hover>
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
                      <Button
                        variant="contained"
                        color="primaryButton"
                        onClick={() => handleDeleteClick(c.id)}
                      >
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

      {deletingCourseId && (
        <ConfirmPopUp
          isOpen={isDeleteConfirmOpen}
          setIsOpen={setIsDeleteConfirmOpen}
          question={deleteQuestion}
          onConfirm={onDeleteConfirm}
        ></ConfirmPopUp>
      )}
    </>
  );
};

export default CourseList;
