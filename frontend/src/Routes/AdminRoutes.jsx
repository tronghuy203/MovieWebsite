import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import ManageMovie from "../pages/Admin/ManageMovie";
import UpdateMovieId from "../pages/Admin/UpdateMovie";
import CreateMovie from "../pages/Admin/CreateMovie";
import Category from "../pages/Admin/ManageCategory";
import NotFound from "../component/ProtectPublic404/NotFound";
import ProtectedRoute from "../component/ProtectPublic404/ProtectRoute";


const AdminRoutes = ({user}) => {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/manage-movie" element={<ManageMovie />}></Route>
        <Route path="/update-movie/:id" element={<UpdateMovieId />}></Route>
        <Route path="/create-movie" element={<CreateMovie />}></Route>
        <Route path="/manage-category" element={<Category />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
