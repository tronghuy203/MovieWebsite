import { Route, Router, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOtp from "../pages/Register/VerifyOtp";
import MovieByCategory from "../pages/Home/MovieByCategory";
import IntroduceMovie from "../pages/Movie/IntroduceMovie";
import WatchMovie from "../pages/Movie/WatchMovie";
import UserLayout from "../Layout/UserLayout";
import NotFound from "../component/ProtectPublic404/NotFound";
import PublicRoute from "../component/ProtectPublic404/PublicRoute";
import UserProtectedRoute from "../component/ProtectPublic404/UserProtectRoute";
import Profile from "../pages/Profile/Profile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<MovieByCategory />} />
       
        <Route element={<UserProtectedRoute />}>
          <Route path="/movie/:id" element={<IntroduceMovie />} />
          <Route path="/watch/:id" element={<WatchMovie />} />
          <Route
            path="/category/:slug/movie/:id"
            element={<IntroduceMovie />}
          />
           <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default UserRoutes;
