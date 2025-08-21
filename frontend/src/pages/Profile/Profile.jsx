import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return (
    <div className="bg-[#191b24] min-h-screen flex justify-center items-center px-4">
      {user && (
        <div className="bg-gray-950 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <img
              src="https://picsum.photos/600/200"
              alt="cover"
              className="w-full h-full object-cover"
            />

            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-gray-950 shadow-md"
              />
            </div>
          </div>

          <div className="mt-20 text-center px-6 pb-6">
            <h1 className="text-2xl font-bold text-white">{user.username}</h1>
            <p className="text-sky-400">
              {user.admin ? "Quản trị viên" : "Người dùng"}
            </p>
            <div className="mt-4 bg-slate-800 p-3 rounded-lg">
              <p className="text-gray-300 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
