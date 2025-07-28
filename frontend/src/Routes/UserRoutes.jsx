import { Route, Router, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOtp from "../pages/Register/VerifyOtp";
import MovieByCategory from "../pages/Home/MovieByCategory";
import IntroduceMovie from "../pages/Movie/IntroduceMovie";
import WatchMovie from "../pages/Movie/WatchMovie";
import UserLayout from "../Layout/UserLayout";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/category/:slug" element={<MovieByCategory />} />
        <Route path="/movie/:id" element={<IntroduceMovie />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="/category/:slug/movie/:id" element={<IntroduceMovie />} />
      </Route>
    </Routes>
  );
};
export default UserRoutes;
