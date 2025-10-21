import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./features/login/Login";
import {
  adminCourseDashBoard,
  adminUserDashBoard,
  courseForm,
  coursePage,
  enrollmentPage,
  loginPage,
  profilePage,
} from "./routes/reactRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UserDashboard from "./pages/admin/UserDashboard";
import CourseDashboard from "./pages/admin/CourseDashboard";
import CoursePage from "./pages/user/CoursePage";
import EnrollementPage from "./pages/user/EnrollementPage";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { getAccessToken } from "./store/slices/loginSlice";
import { tokenDecoder } from "./shared/functions/tokenDecocer";
import Profile from "./pages/Profile";
import CourseForm from "./features/course/form/CourseForm";

function App() {
  const accessToken = useSelector(getAccessToken);
  const token = accessToken ? tokenDecoder(accessToken) : null;

  const adminRoutes = (
    <>
    {/* // <Route element={<ProtectedRoutes isAuthenticated={true} />}> */}
      <Route path={courseForm} element={<CourseForm/>}/>
      <Route path={adminUserDashBoard} element={<UserDashboard />}></Route>
      <Route path={adminCourseDashBoard} element={<CourseDashboard />}></Route>
      <Route path={profilePage} element={<Profile />} />
    {/* // </Route> */}
    </>
  );

  const userRoutes = (
    // <Route element={<ProtectedRoutes isAuthenticated={true} />}>
    <>
      <Route path={coursePage} element={<CoursePage />}></Route>
      <Route path={enrollmentPage} element={<EnrollementPage />}></Route>
      <Route path={profilePage} element={<Profile />} />
    </>
  );

  const routes = token?.role == "Admin" ? adminRoutes : userRoutes;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path={loginPage} element={<Login />} />
            {routes}
          </Route>
          {/* <Route path="*" element={}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
