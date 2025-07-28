import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import ManageMovie from "../pages/Admin/ManageMovie";
import UpdateMovieId from "../pages/Admin/UpdateMovie";
import CreateMovie from "../pages/Admin/CreateMovie";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/manage-movie" element={<ManageMovie />}></Route>
        <Route path="/update-movie/:id" element={<UpdateMovieId />}></Route>
        <Route path="/create-movie" element={<CreateMovie />}></Route>
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
