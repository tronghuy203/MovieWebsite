import { useEffect, useMemo, useState } from "react";
import { deleteUserId, getAllUser, updateUserId } from "../../redux/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";

const ManageUser = () => {
  const [editUser, setEditUser] = useState(null);
  const [editing, setEditing] = useState({
    username: "",
    email: "",
    admin: false,
  });

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dataUser = useSelector((state) => state.user.getAllUser?.dataUser);
  const dispatch = useDispatch();
  const axiosJWT = useMemo(
    () => createAxios(user, dispatch, getLoginSuccess),
    [user, dispatch]
  );
  useEffect(() => {
    getAllUser(dispatch, axiosJWT);
  }, [dispatch, axiosJWT]);
  const handleClickEdit = (user) => {
    setEditUser(user._id);
    setEditing({
      username: user.username,
      email: user.email,
      admin: user.admin,
    });
  };
  const handleUpdateUser = async (id) => {
    await updateUserId(id, editing, dispatch, axiosJWT);
    setEditUser(null);
    getAllUser(dispatch, axiosJWT);
  };
  const handleCancelUpdate = () => {
    setEditUser(null);
  };
  const handleDeleteUser = (id) => {
    deleteUserId(id, axiosJWT);
    getAllUser(dispatch, axiosJWT);
  };
  return (
    <div className="p-4 ">
      <h1 className="text-center font-bold text-3xl p-5">Quản lý người dùng</h1>
      <table className="w-full h-full bg-[rgba(189,185,185,0.42)] rounded-lg">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Ảnh đại diện</th>
            <th className="px-4 py-2">Tên người dùng</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Quyền hạn</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((user) =>
            editUser === user._id ? (
              <tr key={user._id} className="text-center bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={
                      user.avatar.startsWith("http")
                        ? user.avatar
                        : `${process.env.REACT_APP_SERVERURL}/${user.avatar}`
                    }
                    alt=""
                    className="mx-auto w-16 h-16 rounded-full object-cover border"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={editing.username}
                    onChange={(e) =>
                      setEditing({ ...editing, username: e.target.value })
                    }
                    className="w-full border rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={editing.email}
                    onChange={(e) =>
                      setEditing({ ...editing, email: e.target.value })
                    }
                    className="w-full border rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={editing.admin}
                    onChange={(e) =>
                      setEditing({ ...editing, admin: e.target.checked })
                    }
                    className="w-5 h-5 accent-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleUpdateUser(user._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Cập nhật
                    </button>
                    <button
                      onClick={() => handleCancelUpdate()}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    >
                      Hủy
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr
                key={user._id}
                className="shadow-sm hover:bg-gray-100 transition text-center"
              >
                <td className="px-4 py-2">
                  <img
                    src={
                      user.avatar.startsWith("http")
                        ? user.avatar
                        : `${process.env.REACT_APP_SERVERURL}/${user.avatar}`
                    }
                    alt=""
                    className="mx-auto w-16 h-16 rounded-full object-cover border"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{user.username}</td>
                <td className="px-4 py-2 text-gray-700">{user.email}</td>
                <td className="px-4 py-2">
                  {user.admin ? (
                    <span className="text-green-600 font-semibold">
                      Có quyền
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Không có</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleClickEdit(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
