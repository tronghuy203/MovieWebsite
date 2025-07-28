import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/AdminNavbar/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex-1 ml-64 p-4">
        <Outlet />
      </div>
    </>
  );
};
export default AdminLayout;
