
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Người dùng</h2>
          <p className="text-3xl font-bold text-indigo-600">1 tỷ</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Phim đã đăng</h2>
          <p className="text-3xl font-bold text-indigo-600">45</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Lượt xem hôm nay</h2>
          <p className="text-3xl font-bold text-indigo-600">789</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
