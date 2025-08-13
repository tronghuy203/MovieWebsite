import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/AdminNavbar/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 overflow-auto ">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
